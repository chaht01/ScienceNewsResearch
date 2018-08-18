import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Button } from "../../../../node_modules/semantic-ui-react";
import { StyledSegment } from "../../Atoms/StyledSegment";
import { StyledAside, StyledSticky } from "../../Atoms/StyledAside";
import Suggestion from "../../Molecules/Suggestion";
import QuestionForm from "../../Organisms/QuesitonPool/QuestionForm";
import { quesitonType } from "../../../Actions/question";
import { questionHighlightModeUndo } from "../../../Actions/questionHighlight";

const mapStateToProps = (state, ownProps) => {
  return {
    highlights: state.questionHighlightReducer,
    article: state.articleReducer.data,
    typed: state.questionReducer.typed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    questionTyping: typed => dispatch(quesitonType(typed)),
    undoHighlightMode: () => dispatch(questionHighlightModeUndo())
  };
};

const OmissionPoolSegment = StyledSegment.extend`
  margin-bottom: 1.5em;
  ${props => props.basis && `flex: ${props.basis};`};
`;
OmissionPoolSegment.Pane = StyledSegment.Pane.extend`

`;

const OmissionPoolView = ({
  article: { title, sentences: content },
  typed,
  questionTyping,
  addQuestion,
  page = 2,
  highlights,
  undoHighlightMode
}) => {
  const {
    inProgress: { data: highlightInProgress, active: highlightMode }
  } = highlights;
  const highlightedSentences = highlightInProgress
    .map(sid => content.filter(s => s.id === sid)[0])
    .map(s => s.text);

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
  console.log(highlightedSentences);
  return (
    <StyledAside>
      <StyledSticky>
        <OmissionPoolSegment basis={1}>
          <StyledSegment.Header>Quesiton that you made.</StyledSegment.Header>
          <StyledSegment.Pane>
            You haven’t raised question yet.
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => <div>{k}</div>)}
          </StyledSegment.Pane>
        </OmissionPoolSegment>

        {highlightMode ? (
          <OmissionPoolSegment
            basis={2}
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <StyledSegment.Header>Raise a question</StyledSegment.Header>
            <StyledSegment.Pane
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                overflow: "hidden"
              }}
            >
              <div>1. Select sentence(s) that your question is based on.</div>
              {highlightedSentences.length > 0 ? (
                <Suggestion
                  items={highlightedSentences}
                  style={{ flex: 1, overflow: "auto" }}
                />
              ) : (
                <div
                  style={{
                    flex: 1,
                    justifySelf: "center",
                    alignSelf: "center"
                  }}
                >
                  any sentence not selected yet
                </div>
              )}
            </StyledSegment.Pane>
            <StyledSegment.Pane>
              <div>2. Type in your question.</div>
              <QuestionForm
                handleSubmit={handleSubmit}
                handleTyped={handleTyped}
                typed={typed}
                questions={[]}
                clearType={clearType}
                style={{ marginBottom: "1em" }}
              />
            </StyledSegment.Pane>
          </OmissionPoolSegment>
        ) : (
          <OmissionPoolSegment>
            <StyledSegment.Header>
              Raise questions that this article does not answer. You can start
              by clicking{" "}
              <Button circular positive icon="plus" size="mini" active />button.
            </StyledSegment.Header>
          </OmissionPoolSegment>
        )}

        <StyledSticky.Footer>
          {!highlightMode ? (
            <StyledSticky.Action content="Finish and see other's question" />
          ) : (
            <StyledSticky.Action content="Prev" onClick={undoHighlightMode} />
          )}
        </StyledSticky.Footer>
      </StyledSticky>
    </StyledAside>
  );
};

const OmissionPool = connect(
  mapStateToProps,
  mapDispatchToProps
)(OmissionPoolView);
export default OmissionPool;
