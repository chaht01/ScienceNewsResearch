import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
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
  questionModalChangeCode,
  questionModalNext
} from "../../../Actions/questionModal";
import { colors } from "../../Configs/var";
import tinycolor from "tinycolor2";

const StyledStep3Header = styled.div`
  display: grid;
  grid-template-columns: 70px 1fr;
  align-items: stretch;
  margin-bottom: 1em;
`;
const StyledStep3List = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(4, 50px);
  align-items: stretch;
  margin-bottom: 1em;
`;
StyledStep3List.Question = styled.span`
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
    step: state.questionModalReducer.step,
    typed: state.questionModalReducer.typed,
    intention: state.questionModalReducer.intention,
    codes: state.questionModalReducer.codes,
    codeIdx: state.questionModalReducer.codeIdx
  };
};

const mapDispatchToProps = dispatch => {
  return {
    copyLegacy: legacy => {
      const { typed, intention, code } = legacy;
      dispatch(questionModalTypeQuestion(typed));
      dispatch(questionModalTypeIntention(intention));
      dispatch(questionModalChangeCode(code));
    },
    clearModal: () => {
      dispatch(questionModalTypeQuestion(""));
      dispatch(questionModalTypeIntention(""));
      dispatch(questionModalChangeCode(null));
      dispatch(questionModalNext(0));
    },
    onTypeChange: typed => dispatch(questionModalTypeQuestion(typed)),
    onIntentionChange: typed => dispatch(questionModalTypeIntention(typed)),
    onCodeChange: code => dispatch(questionModalChangeCode(code)),
    nextStep: step => dispatch(questionModalNext(step))
  };
};

const QuestionCRUDModalView = ({
  question: legacy,
  trigger,
  step,
  typed,
  intention,
  codes,
  codeIdx,
  copyLegacy,
  clearModal,
  onTypeChange,
  onIntentionChange,
  onCodeChange,
  nextStep: _nextStep
}) => {
  const handleTypeChange = (e, { value }) => {
    if (e.target.name === "question") {
      onTypeChange(value);
    } else if (e.target.name === "intention") {
      onIntentionChange(value);
    }
  };
  const handleCodeChange = (e, { value: code }) => {
    onCodeChange({ code });
  };
  let modalInstance = null;

  const is_create =
    legacy === null ||
    legacy.id === -1 ||
    legacy.id === null ||
    legacy.id === undefined;

  const nextStep = _nextStep.bind(this, step + 1);
  return (
    <Modal
      trigger={trigger}
      ref={ref => (modalInstance = ref)}
      onMount={() => {
        copyLegacy(legacy);
      }}
      onUnmount={clearModal}
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
                onChange={handleTypeChange}
              />
            </Form.Field>
            <Form.Field>
              <label>will help other readers to</label>
              <Input
                name="intention"
                value={intention}
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
            {codes.map(({ label, code }, idx) => (
              <Form.Field key={idx} style={{ marginBottom: 0 }}>
                <StyledRadio
                  label={label}
                  name="question_code"
                  value={code}
                  checked={codes[codeIdx] && codes[codeIdx].code === code}
                  onChange={handleCodeChange}
                  warning={code === "warning"}
                />
              </Form.Field>
            ))}
          </StyledRadioForm>
          <StyledLevel2Form>
            <StyledNameTag>Level 2</StyledNameTag>
            <Dropdown
              placeholder="Select Friend"
              fluid
              selection
              options={[
                { text: "1", value: 1 },
                { text: "2", value: 2 },
                { text: "3", value: 3 }
              ]}
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
        </Modal.Content>
      ) : (
        <Modal.Content>
          <h4>3.How these questions are similar to your question?</h4>
          <StyledStep3Header>
            <StyledNameTag>Your Question</StyledNameTag>
            <b style={{ textAlign: "center", alignSelf: "center" }}>{typed}</b>
          </StyledStep3Header>
          {["hello world", "hell world", "new questions"].map(
            (inquiry, idx) => (
              <StyledStep3List>
                <StyledStep3List.Question>{inquiry}</StyledStep3List.Question>
                {[`same`, `similar`, `different`, `don't know`].map(
                  (choice, idx) => (
                    <Form.Field key={idx} style={{ marginBottom: 0 }}>
                      <StyledRadio
                        label={choice}
                        name={`inquiry_${idx}`}
                        value={choice}
                      />
                    </Form.Field>
                  )
                )}
              </StyledStep3List>
            )
          )}
        </Modal.Content>
      )}

      <Modal.Actions>
        <Button
          content="Cancel"
          key="done"
          onClick={() => modalInstance.handleClose()}
        />
        {step === 0 ? (
          <Button content="Next" onClick={nextStep} />
        ) : (
          <Button positive content="Done" />
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
