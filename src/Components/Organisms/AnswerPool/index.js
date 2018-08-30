import React from "react";
import { Button, Form, Input } from "semantic-ui-react";
import styled from "styled-components";
import SuggestionPreview from "../SuggestionPreview";
import { quesitonType, poolFoldingOpen } from "../../../Actions/question";
import { connect } from "react-redux";
import { colors } from "../../Configs/var";
import { StyledAside, StyledSticky } from "../../Atoms/StyledAside";
import AnswererQuestion from "../../Molecules/AnswererQuestion";
import { shownFetchRequest, shownExpandToggle } from "../../../Actions/shown";

const mapStateToProps = (state, ownProps) => {
  return {
    article: state.articleReducer.data,
    typed: state.questionReducer.typed,
    _showns: state.shownReducer,
    questions: state.questionReducer.data,
    highlights: state.answerHighlightReducer,
    takeInProgress: state.takeReducer.inProgress.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchShowns: call_cnt => dispatch(shownFetchRequest(call_cnt)),
    expandShown: shown_id => dispatch(shownExpandToggle(shown_id))
  };
};

const AnswerPoolView = ({
  //ownProps
  startHighlight,
  cancelHighlight,
  onConfirmHighlight,

  //stateToProps
  article: { title, sentences: content },
  questions,
  highlights: {
    inProgress: {
      active: highlightMode,
      shown: targetShown,
      data: sentenceIds
    },
    hover: { sentence_id: hoveredSentenceId }
  },
  _showns: { data: showns, loading: shownsLoading, call_cnt },
  fetchShowns: _fetchShowns,
  expandShown
}) => {
  const highlightedSentences = content
    .filter(sentence => sentenceIds.indexOf(sentence.id) > -1)
    .map(sentence => sentence.text);
  const latestShown = showns.map(shown => ({
    ...shown,
    _latest_take: shown.takes.reduce((a, b) => (b.id > a.id ? b : a))
  }));
  const fetchShowns = _fetchShowns.bind(null, call_cnt);
  if (highlightMode && targetShown !== null) {
    return (
      <StyledAside>
        <StyledSticky>
          <SuggestionPreview
            targetQuestion={targetShown.question}
            highlightedSentences={highlightedSentences}
          />

          <StyledSticky.Footer>
            <Button
              onClick={cancelHighlight}
              disabled={
                showns.filter(shown => shown.id === targetShown.id)[0]._loading
              }
            >
              Cancel
            </Button>
            <Button
              disabled={
                highlightedSentences.length === 0 ||
                showns.filter(shown => shown.id === targetShown.id)[0]._loading
              }
              loading={
                showns.filter(shown => shown.id === targetShown.id)[0]._loading
              }
              onClick={onConfirmHighlight}
              positive
              content="Confrim"
            />
          </StyledSticky.Footer>
        </StyledSticky>
      </StyledAside>
    );
  } else {
    return (
      <StyledAside>
        <StyledSticky>
          <h3>Choose questions you can answer</h3>
          <StyledSticky.Scrollable style={{ background: "#eeeeee" }}>
            <StyledSticky.ScrollablePane>
              {latestShown
                .filter(shown => {
                  if (hoveredSentenceId === null || highlightMode) {
                    return true;
                  } else {
                    return (
                      shown._latest_take.answertexts
                        .map(answertext => answertext.sentence)
                        .indexOf(hoveredSentenceId) > -1
                    );
                  }
                })
                .map(shown => (
                  <AnswererQuestion
                    key={shown.question.id}
                    question={shown.question}
                    startHighlight={startHighlight.bind(this, shown)}
                    answered={shown._latest_take.taken}
                    expanded={shown._expanded}
                    onExpandChange={() => expandShown(shown.id)}
                  />
                ))}
              {hoveredSentenceId === null && (
                <Button
                  content="Fetch more"
                  fluid
                  onClick={fetchShowns}
                  disabled={shownsLoading}
                  loading={shownsLoading}
                />
              )}
            </StyledSticky.ScrollablePane>
          </StyledSticky.Scrollable>

          <StyledSticky.Footer />
        </StyledSticky>
      </StyledAside>
    );
  }
};

const AnswerPool = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerPoolView);
export default AnswerPool;
