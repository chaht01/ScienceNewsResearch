import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { findIndex as _findIndex } from "lodash";
import {
  Modal,
  Button,
  Input,
  Form,
  Radio,
  Icon,
  Popup,
  Dropdown
} from "semantic-ui-react";
import {
  questionModalTypeQuestion,
  questionModalTypeIntention,
  questionModalNext,
  questionModalChangeCodeFirst,
  questionModalChangeCodeSecond,
  questionModalFetchInquiriesRequest,
  questionModalUpdateInquiry,
  questionCRUDSubmit,
  questionCRUDSubmitRequest,
  questionModalClearInquries,
  questionModalOpen,
  questionModalClose
} from "../../../Actions/questionModal";
import { colors } from "../../Configs/var";
import tinycolor from "tinycolor2";
import { quesitonType } from "../../../Actions/question";

const StyledStep3Header = styled.div`
  display: grid;
  grid-template-columns: 70px 1fr;
  align-items: stretch;
  margin-bottom: 1em;
`;
const StyledStep3List = styled(Form)`
  display: grid;
  grid-template-columns: 1fr repeat(4, 50px);
  align-items: stretch;
  margin-bottom: 1em;
`;
StyledStep3List.Question = styled(Form.Field)`
  align-self: center;
  padding: 0.4em 0.6em 0.4em 0.8em;
`;
const StyledLevel2Form = styled.div`
  display: grid;
  grid-template-columns: 70px 1fr 40px;
  align-items: stretch;
  margin-bottom: 1em;
`;
const StyledRadioForm = styled(Form)`
  display: grid;
  grid-template-columns: 70px repeat(3, minmax(auto, 90px)) minmax(
      auto,
      calc(90px + 1em)
    );
  align-items: stretch;
  margin-bottom: 1em;
`;
const StyledNameTag = styled.label`
    margin-right: 1em;
    border-radius: 4px;
    background: ${colors.blue}
    color: #fff;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px !important;
    text-align: center;
`;
const StyledRadio = styled(Radio)`
  width: 100%;
  height: 100%;
  & > input {
    display: none !important;
    &:checked ~ label {
      border: 1px solid ${props => (props.warning ? colors.red : colors.blue)} !important;
      color: ${props => (props.warning ? colors.red : colors.blue)} !important;
      &:after,
      &:before {
        content: initial !important;
        display: none;
      }
    }
  }
  & > label {
    font-size: 12px !important;
    height: 100% !important;
    background: #fff !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    word-wrap: break-word !important;
    padding: 0.4em 0.6em !important;
    text-align: center !important;
    line-height: 1 !important;
    border: 1px solid
      ${props =>
        props.warning
          ? tinycolor(colors.red)
              .lighten(30)
              .toString()
          : `#e1e1e7`} !important;
    border-radius: 4px;
    color: ${props =>
      props.warning
        ? tinycolor(colors.red)
            .lighten(30)
            .toString()
        : `#aaa`} !important;
    margin-left: ${props => (props.warning ? `1em` : `0`)};
    &:after,
    &:before {
      content: initial !important;
    }
  }
`;

const mapStateToProps = (state, ownProps) => {
  return {
    phase: state.pageReducer.data,
    step: state.questionModalReducer.step,
    typed: state.questionModalReducer.typed,
    intention: state.questionModalReducer.intention,
    codes: state.questionModalReducer.codes,
    code_first_id: state.questionModalReducer.code_first_id,
    code_second_id: state.questionModalReducer.code_second_id,
    group_inquries: state.questionModalReducer.group_inquries.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveModalInstance: modalInstance =>
      dispatch(questionModalOpen(modalInstance)),
    onCloseModal: () => dispatch(questionModalClose()),
    copyLegacy: legacy => {
      const { typed, intention, code_first, code_second } = legacy;
      dispatch(questionModalTypeQuestion(typed));
      dispatch(questionModalTypeIntention(intention));
      dispatch(questionModalChangeCodeFirst(code_first));
      dispatch(questionModalChangeCodeSecond(code_second));
    },
    clearModal: () => {
      dispatch(questionModalTypeQuestion(""));
      dispatch(questionModalTypeIntention(""));
      dispatch(questionModalChangeCodeFirst(-1));
      dispatch(questionModalChangeCodeSecond(-1));
      dispatch(questionModalNext(0));
      dispatch(questionModalClearInquries());
    },
    onTypeChange: typed => dispatch(questionModalTypeQuestion(typed)),
    onIntentionChange: typed => dispatch(questionModalTypeIntention(typed)),
    onCodeFirstChange: code_id =>
      dispatch(questionModalChangeCodeFirst(code_id)),
    onCodeSecondChange: code_id =>
      dispatch(questionModalChangeCodeSecond(code_id)),
    nextStep: step => dispatch(questionModalNext(step)),
    fetchInquiries: question_typed =>
      dispatch(questionModalFetchInquiriesRequest(question_typed)),
    updateInquiry: (inquiry_id, similarity) =>
      dispatch(questionModalUpdateInquiry(inquiry_id, similarity)),
    submitModal: (
      phase,
      question_id,
      typed,
      intention,
      code_first_id,
      code_second_id,
      group_inquries,
      onSubmit
    ) =>
      dispatch(
        questionCRUDSubmitRequest(
          phase,
          question_id,
          typed,
          intention,
          code_first_id,
          code_second_id,
          group_inquries,
          onSubmit
        )
      )
  };
};

const QuestionCRUDModalView = ({
  onSubmit,
  onCloseModal,
  saveModalInstance,
  phase,
  question: legacy,
  trigger,
  step,
  typed,
  intention,
  codes,
  code_first_id,
  code_second_id,
  copyLegacy,
  clearModal,
  onTypeChange,
  onIntentionChange,
  onCodeFirstChange,
  onCodeSecondChange,
  nextStep: _nextStep,
  fetchInquiries: _fetchInquiries,
  group_inquries,
  updateInquiry,
  submitModal
}) => {
  const handleTypeChange = (e, { value }) => {
    if (e.target.name === "question") {
      onTypeChange(value);
    } else if (e.target.name === "intention") {
      onIntentionChange(value);
    }
  };
  const handleCodeFirstChange = (e, { value: code_id }) => {
    if (code_first_id !== code_id) {
      onCodeFirstChange(code_id);
      onCodeSecondChange(-1);
    }
  };

  const handleCodeSecondChange = (e, { value: code_id }) => {
    onCodeSecondChange(code_id);
  };
  let modalInstance = null;

  const is_create =
    legacy === null ||
    legacy.id === -1 ||
    legacy.id === null ||
    legacy.id === undefined;

  const submitQuestionModal = () => {
    submitModal(
      phase,
      legacy.id,
      typed,
      intention,
      code_first_id,
      code_second_id,
      group_inquries,
      onSubmit
    );
  };

  const fetchInquiries = () => {
    _fetchInquiries(typed);
  };

  const prevStep = _nextStep.bind(this, step - 1);
  return (
    <Modal
      trigger={trigger}
      ref={ref => (modalInstance = ref)}
      onMount={() => {
        saveModalInstance(modalInstance);
        copyLegacy(legacy);
      }}
      onUnmount={() => {
        onCloseModal();
        clearModal();
      }}
      style={{ maxWidth: "500px" }}
    >
      {step === 0 ? (
        <Modal.Content>
          <h4>1.Complete the following sentence.</h4>
          <Form>
            <Form.Field>
              <label>"Answer for my question </label>
              <Input
                name="question"
                value={typed}
                placeholder="Type your question"
                onChange={handleTypeChange}
              />
            </Form.Field>
            <Form.Field>
              <label>will help other readers to</label>
              <Input
                name="intention"
                value={intention}
                placeholder="intention of your question"
                onChange={handleTypeChange}
              />
            </Form.Field>
          </Form>
          <h4>
            2. Categorize your question in 2 levels - My question asks about
            _____.
          </h4>
          <StyledRadioForm>
            <StyledNameTag>Level 1</StyledNameTag>
            {codes.map(({ id: code_id, text: label }, idx) => (
              <Form.Field key={idx} style={{ marginBottom: 0 }}>
                <StyledRadio
                  label={label}
                  name="question_code"
                  value={code_id}
                  checked={code_id === code_first_id}
                  onChange={handleCodeFirstChange}
                  warning={false} //todo
                />
              </Form.Field>
            ))}
          </StyledRadioForm>
          {code_first_id !== -1 &&
            codes.filter(code => code.id === code_first_id)[0].code_second
              .length > 0 && (
              <StyledLevel2Form>
                <StyledNameTag>Level 2</StyledNameTag>
                <Dropdown
                  placeholder="Select Type"
                  fluid
                  selection
                  onChange={handleCodeSecondChange}
                  value={code_second_id}
                  options={codes
                    .filter(code => code.id === code_first_id)[0]
                    .code_second.map(code => ({
                      ...code,
                      value: code.id
                    }))}
                />
                <Popup
                  key={"level2"}
                  trigger={
                    <Icon
                      style={{
                        alignSelf: "center",
                        justifySelf: "center"
                      }}
                      name="question circle"
                      color="grey"
                    />
                  }
                  header={"level2 header"}
                  content={`This is description about level2`}
                />
              </StyledLevel2Form>
            )}
        </Modal.Content>
      ) : (
        <Modal.Content>
          <h4>3.How these questions are similar to your question?</h4>
          <StyledStep3Header>
            <StyledNameTag>Your Question</StyledNameTag>
            <b style={{ textAlign: "center", alignSelf: "center" }}>{typed}</b>
          </StyledStep3Header>
          {group_inquries.map((inquiry, idx) => (
            <StyledStep3List key={inquiry.id}>
              <StyledStep3List.Question>
                {inquiry.text}
              </StyledStep3List.Question>

              {[`same`, `similar`, `different`, `don't know`].map(
                (choice, idx) => (
                  <Form.Field style={{ marginBottom: 0 }}>
                    <StyledRadio
                      label={choice}
                      name={`inquiry_${idx}`}
                      value={idx}
                      checked={inquiry.similarity === idx}
                      onChange={(e, { value: similarity }) =>
                        updateInquiry(inquiry.id, similarity)
                      }
                    />
                  </Form.Field>
                )
              )}
            </StyledStep3List>
          ))}
        </Modal.Content>
      )}

      <Modal.Actions>
        <Button content="Cancel" onClick={() => modalInstance.handleClose()} />
        {step === 0 &&
          typed.length !== 0 &&
          (is_create || typed !== legacy.typed) && (
            <Button content="Next" onClick={fetchInquiries} />
          )}
        {step === 1 && <Button content="Prev" onClick={prevStep} />}
        {(step === 1 || (!is_create && typed === legacy.typed)) &&
          typed.length > 0 && (
            <React.Fragment>
              <Button positive content="Done" onClick={submitQuestionModal} />
            </React.Fragment>
          )}
      </Modal.Actions>
    </Modal>
  );
};

const QuestionCRUDModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionCRUDModalView);

export default QuestionCRUDModal;
