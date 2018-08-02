import React from "react";
import { Button, Form, Input } from "semantic-ui-react";
import styled from "styled-components";
import Pool from "./Pool";
import Todos from "./Todos";
import SuggestionPreview from "./SuggestionPreview";
import { quesitonType, poolFoldingOpen } from "../../../Actions/question";
import { connect } from "react-redux";
import { colors } from "../../Configs/var";
import QuestionForm from "./QuestionForm";
const StyledAside = styled.aside`
  width: 400px;
  padding-left: 20px;
  align-self: center;
  height: 100%;
`;
const StyledSticky = styled.div`
  position: fixed;
  display: flex;
  padding-top: 2em;
  flex-direction: column;
  width: 400px;
  height: 100%;
`;
StyledSticky.Content = styled.div`
  flex: 1;
  overflow-y: auto;
`;
StyledSticky.Footer = styled.div`
  justify-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 50px;
`;

StyledSticky.Action = styled(Button)`
  justify-self: flex-end;
`;
StyledSticky.ActionDescription = styled.span`
  justify-self: flex-start;
  color: ${colors.blue};
  flex: 1;
  padding-left: 2em;
`;

const mapStateToProps = (state, ownProps) => {
  return {
    typed: state.questionReducer.typed,
    folding: state.questionReducer.folding,
    takeInProgress: state.takeReducer.inProgress.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    questionTyping: typed => dispatch(quesitonType(typed)),
    spreadPool: () => dispatch(poolFoldingOpen())
  };
};

const QuestionPoolView = ({
  typed,
  folding,
  questionTyping,
  spreadPool,
  addQuestion,
  page,
  article: { title, sentences: content },
  done,
  highlightMode,
  toggleHighlight,
  highlightQuestionId,
  highlightActive,
  confirmTakes,
  cancelHighlight,
  confirmHighlight,
  hoveredQuestionIds,
  hoverEnter,
  hoverLeave,
  todos,
  questions,
  todoTakeMap,
  takeInProgress
}) => {
  const handleTyped = value => {
    questionTyping(value);
  };
  const clearType = () => {
    questionTyping("");
  };
  const handleSubmit = e => {
    addQuestion(typed, page);
    clearType();
    e.preventDefault();
  };

  const QidOfTakeInProgress = takeInProgress.map(t => t.question_id);

  const doneValidation =
    Object.keys(todoTakeMap)
      .map(todo_id => todoTakeMap[todo_id]._latest_milestone.found)
      .indexOf(null) < 0;

  if (highlightMode) {
    const targetQuestion = questions.filter(
      q => q.id === highlightQuestionId
    )[0];
    const highlightedSentences = content
      .filter(s => highlightActive.indexOf(s.id) >= 0)
      .sort((a, b) => (a.order < b.order ? -1 : 1))
      .map(s => s.text);
    return (
      <StyledAside>
        <StyledSticky>
          <StyledSticky.Content>
            <SuggestionPreview
              targetQuestion={targetQuestion}
              highlightedSentences={highlightedSentences}
            />
          </StyledSticky.Content>
          <StyledSticky.Footer>
            <Button onClick={cancelHighlight}>Cancel</Button>
            <Button
              onClick={confirmHighlight}
              disabled={highlightedSentences.length === 0}
            >
              Confirm
            </Button>
          </StyledSticky.Footer>
        </StyledSticky>
      </StyledAside>
    );
  } else {
    return (
      <StyledAside>
        <StyledSticky>
          <QuestionForm
            handleSubmit={handleSubmit}
            handleTyped={handleTyped}
            typed={typed}
            questions={questions}
            clearType={clearType}
          />
          <StyledSticky.Content>
            {page === 1 ? (
              <Pool
                questions={questions}
                folding={folding}
                spreadPool={spreadPool}
              />
            ) : page === 2 ? (
              <Todos
                content={content}
                todos={todos}
                todoTakeMap={todoTakeMap}
                highlightMode={highlightMode}
                toggleHighlight={toggleHighlight}
                hoverEnter={hoverEnter}
                hoverLeave={hoverLeave}
                highlightQuestionId={highlightQuestionId}
                highlightActive={highlightActive}
                hoveredQuestionIds={hoveredQuestionIds}
              />
            ) : null}
          </StyledSticky.Content>
          <StyledSticky.Footer>
            {page === 1 ? (
              <React.Fragment>
                <StyledSticky.ActionDescription>
                  {QidOfTakeInProgress.length} Questions Selected.{" "}
                </StyledSticky.ActionDescription>
                <StyledSticky.Action
                  onClick={confirmTakes}
                  disabled={page.loading}
                  loading={page.loading}
                >
                  Next
                </StyledSticky.Action>
              </React.Fragment>
            ) : page === 2 ? (
              <React.Fragment>
                <StyledSticky.Action
                  onClick={done}
                  disabled={page.loading || !doneValidation}
                  loading={page.loading}
                >
                  Done
                </StyledSticky.Action>
              </React.Fragment>
            ) : null}
          </StyledSticky.Footer>
        </StyledSticky>
      </StyledAside>
    );
  }
};

const QuestionPool = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionPoolView);
export default QuestionPool;
