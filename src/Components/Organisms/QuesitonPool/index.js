import React from "react";
import { Button, Form, Input, Popup } from "semantic-ui-react";
import SuggestionPreview from "../SuggestionPreview";
import Msg from "../../Atoms/Msg";
import {
  quesitonType,
  poolFoldingOpen,
  questionQuestionExpandToggle,
  questionQuestionDeleteRequest
} from "../../../Actions/question";
import { connect } from "react-redux";
import QuestionForm from "../../Molecules/QuestionForm";
import { StyledAside, StyledSticky } from "../../Atoms/StyledAside";
import styled from "styled-components";
import { StyledSegment } from "../../Atoms/StyledSegment";
import { pageNextRequest } from "../../../Actions/page";
import { PAGES, PAGES_serializer } from "../../../Reducers/page";
import QuestionerQuestion from "../../Molecules/QuestionerQuestion";
import {
  questionModalOpen,
  questionModalClose
} from "../../../Actions/questionModal";

const PoolSegment = styled(StyledSegment)`
  margin-top: 1.5em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const mapStateToProps = (state, ownProps) => {
  return {
    questions: state.questionReducer.data,
    typed: state.questionReducer.typed,
    takeInProgress: state.takeReducer.inProgress.data,
    user_detail: state.authReducer.signup.data,
    page: state.pageReducer.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    questionTyping: typed => dispatch(quesitonType(typed)),
    spreadPool: () => dispatch(poolFoldingOpen()),
    toStep2: () => dispatch(pageNextRequest(PAGES.QUESTIONER_STEP2, [])),
    toBodyIntro: () => dispatch(pageNextRequest(PAGES.BODYQUESTIONER_INTRO, [])),
    expandQuestion: question_id =>
      dispatch(questionQuestionExpandToggle(question_id)),
    deleteQuestion: (question_id, removed_step) =>
      dispatch(questionQuestionDeleteRequest(question_id, removed_step))
  };
};

const QuestionPoolView = ({
  //ownProps
  addQuestion,
  //stateToProps
  typed,
  user_detail: { username },
  questionTyping,
  page,
  questions,
  toStep2,
  toBodyIntro,
  expandQuestion,
  deleteQuestion
}) => {
  const handleTyped = value => {
    questionTyping(value);
  };
  const clearType = () => {
    questionTyping("");
  };

  const questionList = questions.filter(
    question =>
      question.questioner === username &&
      1 <= question.created_step &&
      question.created_step <= PAGES_serializer(page) &&
      question.copied_to === null &&
      question.removed_step === null
  );

  return (
    <StyledAside>
      <StyledSticky>
        {page === PAGES.QUESTIONER_STEP1 && (
          <PoolSegment>
            <PoolSegment.Header>
              Based on the title of news article, what do you expect to read
              from the content?
            </PoolSegment.Header>
            <span>
              (Please write a wh-question, starting with who, where, when, what,
              why, how or so.)
            </span>
            <QuestionForm
              handleTyped={handleTyped}
              typed={typed}
              clearType={clearType}
              style={{ marginBottom: "1em" }}
            />
          </PoolSegment>
        )}

        {page === PAGES.QUESTIONER_STEP2 && (
          <PoolSegment>
            <PoolSegment.Header>
              After seeing others’ questions, what do you expect to read from
              the content?
            </PoolSegment.Header>
            <span>
              (Please write a wh-question, starting with who, where, when, what,
              why, how or so.)
            </span>
            <QuestionForm
              handleTyped={handleTyped}
              typed={typed}
              clearType={clearType}
              style={{ marginBottom: "1em" }}
            />
          </PoolSegment>
        )}
        <h3>Your quesitons </h3>
        <span>You need to generate 3 or more questions to proceed.</span>
        <StyledSticky.Scrollable style={{ background: "#eeeeee" }}>
          <StyledSticky.ScrollablePane>
            {questionList.length === 0 && `You didn't make any question yet!`}
            {questionList.map(question => (
              <QuestionerQuestion
                key={question.id}
                question={question}
                editable
                onDelete={() =>
                  deleteQuestion(question.id, PAGES_serializer(page))
                }
                expanded={question._expanded}
                onExpandChange={() => expandQuestion(question.id)}
              />
            ))}
          </StyledSticky.ScrollablePane>
        </StyledSticky.Scrollable>

        <StyledSticky.Footer>
          <React.Fragment>
            {page === PAGES.QUESTIONER_STEP1 && (
              <Popup
                trigger={
                  <StyledSticky.Action
                    onClick={toStep2}
                    disabled={page.loading}
                    loading={page.loading}
                    positive
                    content="I can not think of new question"
                  />
                }
                hovered
                inverted
              >
                You can see others' questions and raise more questions.
              </Popup>
            )}
            {page === PAGES.QUESTIONER_STEP2 && (
              <StyledSticky.Action
                onClick={toBodyIntro}
                loading={page.loading}
                positive
                disabled={questionList.length < 3 || page.loading}
                content={
                  questionList.length < 3 ? "Make at least 3 quesitons" : "Next"
                }
              />
            )}
          </React.Fragment>
        </StyledSticky.Footer>
      </StyledSticky>
    </StyledAside>
  );
};

const QuestionPool = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionPoolView);
export default QuestionPool;
