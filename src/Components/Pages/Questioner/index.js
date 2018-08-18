import React from "react";
import { connect } from "react-redux";
import { find as _find } from "lodash";

import Article from "../../Organisms/Article";
import QuestionPool from "../../Organisms/QuesitonPool";
import {
  questionQuestionCreateRequest,
  questionQuestionUpdateRequest
} from "../../../Actions/question";
import styled from "styled-components";
import { takeTakeSaveRequest } from "../../../Actions/take";
import OmissionPool from "../../Organisms/OmissionPool";
import {
  questionHighlightModeActivate,
  questionHighlightModeUndo,
  questionHighlightSaveRequest,
  questionHighlightHoverEnter,
  questionHighlightHoverLeave
} from "../../../Actions/questionHighlight";
import { StyledSegment } from "../../Atoms/StyledSegment";

const StyledQuestionSharing = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
  margin: 0 auto;
`;

const mapStateToProps = (state, ownProps) => {
  return {
    article: state.articleReducer,
    pool: state.questionReducer,
    highlights: state.questionHighlightReducer,
    user_detail: state.authReducer.signup.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateQuestion: question =>
      dispatch(questionQuestionUpdateRequest(question)),
    addQuestion: (text, phase, research_id, article_id) =>
      dispatch(
        questionQuestionCreateRequest(text, phase, research_id, article_id)
      ),
    activeHighlightMode: ({ article, question }) =>
      dispatch(questionHighlightModeActivate({ article, question })),
    undoHighlightMode: () => dispatch(questionHighlightModeUndo()),
    applyHighlight: (take_id, found, sentences) =>
      dispatch(questionHighlightSaveRequest(take_id, found, sentences)),
    hoverEnter: question_ids =>
      dispatch(questionHighlightHoverEnter(question_ids)),
    hoverLeave: question_ids =>
      dispatch(questionHighlightHoverLeave(question_ids))
  };
};

const QuestionerView = ({
  article,
  pool,
  highlights,
  user_detail: {
    id: user_id,
    profile: { article: article_id, research: research_id }
  },
  updateQuestion: _updateQuestion,
  addQuestion: _addQuestion,
  activeHighlightMode,
  undoHighlightMode,
  applyHighlight,
  hoverEnter,
  hoverLeave,
  page,
  nextPage
}) => {
  const addQuestion = (typed, phase) => {
    typed = typed.trim();
    if (typed.length === 0) return;
    _addQuestion(typed, phase, research_id, article_id);
  };

  const toggleHighlightMode = (question = null) => {
    if (question === null) {
      activeHighlightMode({ article: article_id });
    } else {
      activeHighlightMode({ article: article_id, question: question.id });
    }
  };

  const cancelHighlight = () => {
    undoHighlightMode();
  };
  const confirmHighlight = () => {
    const { data } = highlights;
    const { question_id, data: sentences } = highlights.inProgress;

    const targetQuestion = data.filter(s => s.id === question_id)[0];
    const remote_sentences = targetQuestion.refText;
    let diff = false;

    diff =
      remote_sentences.reduce(
        (acc, curr) => acc || sentences.indexOf(curr) < 0,
        false
      ) ||
      sentences.reduce(
        (acc, curr) => acc || remote_sentences.indexOf(curr) < 0,
        false
      );

    if (sentences.length === 0 || !diff) {
      cancelHighlight();
    } else {
      applyHighlight({ ...targetQuestion, refText: sentences });
    }
  };

  const confirmTakes = () => {
    nextPage(2, []);
  };
  const done = () => {
    nextPage(3, []);
  };
  return (
    <React.Fragment>
      {article.data !== null && (
        <React.Fragment>
          <StyledQuestionSharing>
            <Article page={page.data} toggleHighlight={toggleHighlightMode} />

            {page.data === 1 ? (
              <QuestionPool
                page={page.data}
                questions={pool.data}
                article={article.data}
                addQuestion={addQuestion}
                toggleHighlight={toggleHighlightMode}
                highlightActive={highlights.inProgress.data}
                highlightQuestionId={highlights.inProgress.question_id}
                highlightMode={highlights.inProgress.active}
                hoveredQuestionIds={highlights.hover.question_ids}
                hoverEnter={hoverEnter}
                hoverLeave={hoverLeave}
                cancelHighlight={cancelHighlight}
                confirmHighlight={confirmHighlight}
                done={done}
                confirmTakes={confirmTakes}
              />
            ) : (
              <OmissionPool />
            )}
          </StyledQuestionSharing>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const Questioner = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionerView);

export default Questioner;
