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
import { PAGES_serializer } from "../../../Reducers/page";

const labelSerializer = key => {
  const mapper = {
    Understanding: "Background Knowledge",
    Research: "Research Itself",
    Extension: "Application"
  };
  return mapper.hasOwnProperty(key) ? mapper[key] : key;
};

const StyledStep2Intention = styled.div`
  display: grid;
  grid-template-columns: 1fr 40px;
`;
const StyledStep3Header = styled.div`
  display: grid;
  grid-template-columns: 1fr;
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
  grid-template-columns: 1fr 40px;
  align-items: stretch;
  margin-bottom: 1em;
`;
const StyledRadioForm = styled(Form)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
    submitLoading: state.questionModalReducer.loading,
    step: state.questionModalReducer.step,
    typed: state.questionModalReducer.typed,
    intention: state.questionModalReducer.intention,
    codes: state.questionModalReducer.codes,
    code_first_id: state.questionModalReducer.code_first_id,
    code_second_id: state.questionModalReducer.code_second_id,
    _group_inquries: state.questionModalReducer.group_inquries,
    openInstance: state.questionModalReducer.openInstance
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
    updateInquiry: (inquiry_id, score) =>
      dispatch(questionModalUpdateInquiry(inquiry_id, score)),
    submitModal: (
      phase,
      question_id,
      typed,
      intention,
      code_first_id,
      code_second_id,
      openInstance,
      scores,
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
          openInstance,
          scores,
          onSubmit
        )
      )
  };
};

const QuestionCRUDModalView = ({
  onSubmit,
  submitLoading,
  onCloseModal,
  openInstance,
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
  _group_inquries: {
    data: group_inquries,
    loading: group_inquries_loading,
    scores,
    udpateLoading: group_inquries_update_loading
  },
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

  const is_create =
    legacy === null ||
    legacy.id === -1 ||
    legacy.id === null ||
    legacy.id === undefined;

  const submitQuestionModal = () => {
    submitModal(
      PAGES_serializer(phase),
      legacy.id,
      typed,
      intention,
      code_first_id,
      code_second_id,
      openInstance,
      scores,
      onSubmit
    );
  };
  let modalInstance = null;

  const fetchInquiries = () => {
    _fetchInquiries(typed);
  };

  const step1Disabled =
    group_inquries_loading ||
    typed.trim().length === 0 ||
    intention.trim().length === 0 ||
    code_first_id === -1 ||
    (codes.filter(code => code.id === code_first_id)[0].code_second.length !==
      0 &&
      code_second_id === -1);

  const step2Disabled =
    step1Disabled ||
    submitLoading ||
    group_inquries
      .map(inquire => inquire.id)
      .filter(inquire_id => !scores.hasOwnProperty(inquire_id)).length > 0;

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
          <h4>1. Complete the following sentence</h4>
          <Form>
            <Form.Field>
              <label>Answer for my question </label>
              <Input
                name="question"
                value={typed}
                placeholder="Type your question"
                onChange={handleTypeChange}
                autofocus
              />
            </Form.Field>
            <Form.Field>
              <label>will help other readers to</label>
              <StyledStep2Intention>
                <Input
                  name="intention"
                  value={intention}
                  placeholder="e.g., to evaluate the validity of research, to understand the article. "
                  onChange={handleTypeChange}
                />
                <Popup
                  key={"intention"}
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
                  header={"Describe how answer for this question will help you and others."}
                  content={`For example, answer for this question can be used to apply the research findings to your everyday decision. Or, it can be helpful to judge how reliable the research finding is. `}
                />
              </StyledStep2Intention>
            </Form.Field>
          </Form>
          <h4>
            2. What does your question ask about? <br /> Categorize your
            question into one of the following group
          </h4>
          <StyledRadioForm>
            {codes.map(({ id: code_id, text: label }, idx) => (
              <Form.Field key={idx} style={{ marginBottom: 0 }}>
                <StyledRadio
                  label={labelSerializer(label)}
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
              <React.Fragment>
                <span>, especially about</span>
                <StyledLevel2Form>
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
                    header={"Provide more detail!"}
                    content={`If you think there is no category fit to your question, choose "Others"`}
                  />
                </StyledLevel2Form>
              </React.Fragment>
            )}
        </Modal.Content>
      ) : (
        <Modal.Content>
          <h4>3. How are these questions similar to your question?</h4>
          <StyledStep3Header>
            <b style={{ textAlign: "center", alignSelf: "center" }}>{typed}</b>
          </StyledStep3Header>
          {group_inquries.map((inquiry, idx) => (
            <StyledStep3List key={inquiry.id}>
              <StyledStep3List.Question>
                {inquiry.question_first.text}
              </StyledStep3List.Question>

              {[`same`, `similar`, `different`, `don't know`].map(
                (choice, idx) => (
                  <Form.Field style={{ marginBottom: 0 }}>
                    <StyledRadio
                      label={choice}
                      name={`inquiry_${idx}`}
                      value={4 - idx} //4,3,2,1
                      checked={scores[inquiry.id] === 4 - idx}
                      onChange={(e, { value: score }) =>
                        updateInquiry(inquiry.id, score)
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
        <Button
          content="Cancel"
          onClick={() => modalInstance.handleClose()}
          disabled={group_inquries_loading || submitLoading}
        />
        {step === 0 &&
          typed.length !== 0 &&
          (is_create || typed !== legacy.typed) && (
            <Button
              content="Next"
              onClick={fetchInquiries}
              loading={group_inquries_loading}
              disabled={step1Disabled}
            />
          )}
        {step === 1 && (
          <Button content="Prev" onClick={prevStep} disabled={submitLoading} />
        )}
        {(step === 1 || (!is_create && typed === legacy.typed)) &&
          typed.length > 0 && (
            <React.Fragment>
              <Button
                positive
                content="Done"
                onClick={submitQuestionModal}
                loading={submitLoading}
                disabled={step2Disabled}
              />
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
