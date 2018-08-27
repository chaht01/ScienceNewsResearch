import React from "react";
import { Button, Form, Input } from "semantic-ui-react";
import SuggestionPreview from "../SuggestionPreview";
import {
  quesitonType,
  poolFoldingOpen,
  questionQuestionExpandToggle
} from "../../../Actions/question";
import { connect } from "react-redux";
import QuestionForm from "../../Molecules/QuestionForm";
import { StyledAside, StyledSticky } from "../../Atoms/StyledAside";
import styled from "styled-components";
import { StyledSegment } from "../../Atoms/StyledSegment";
import { pageNextRequest } from "../../../Actions/page";
import { PAGES } from "../../../Reducers/page";
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
    toStep3: () => dispatch(pageNextRequest(PAGES.QUESTIONER_STEP3, [])),
    expandQuestion: question_id =>
      dispatch(questionQuestionExpandToggle(question_id))
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
  toStep3,
  expandQuestion
}) => {
  const handleTyped = value => {
    questionTyping(value);
  };
  const clearType = () => {
    questionTyping("");
  };

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
        <h3>Questions that you made.</h3>
        <StyledSticky.Scrollable style={{ background: "#eeeeee" }}>
          <StyledSticky.ScrollablePane>
            {questions
              .filter(question => question.owner === username)
              .map(question => (
                <QuestionerQuestion
                  key={question.id}
                  question={question}
                  editable
                  expanded={question._expanded}
                  onExpandChange={() => expandQuestion(question.id)}
                />
              ))}
          </StyledSticky.ScrollablePane>
        </StyledSticky.Scrollable>

        <StyledSticky.Footer>
          <React.Fragment>
            {page === PAGES.QUESTIONER_STEP1 && (
              <StyledSticky.Action
                onClick={toStep2}
                disabled={page.loading}
                loading={page.loading}
                positive
                content="I Can't think of question anymore"
              />
            )}
            {page === PAGES.QUESTIONER_STEP2 && (
              <StyledSticky.Action
                onClick={toStep3}
                disabled={page.loading}
                loading={page.loading}
                positive
                content="Next"
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
