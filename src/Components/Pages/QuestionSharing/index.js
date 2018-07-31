import React from "react";
import { articleArticleFetchRequest } from "../../../Actions/article";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { find as _find } from "lodash";

import Article from "../../Organisms/Article";
import QuestionPool from "../../Organisms/QuesitonPool";
import {
  questionPoolFetchRequest,
  questionQuestionCreateRequest,
  questionQuestionUpdateRequest
} from "../../../Actions/question";
import {
  highlightHighlightHoverEnter,
  highlightHighlightHoverLeave,
  highlightHighlightModeActivate,
  highlightHighlightSaveRequest,
  highlightHighlightModeUndo,
  highlightHighlightSaveFailure
} from "../../../Actions/highlight";
import styled from "styled-components";
import {
  takeListFetchRequest,
  takeMark,
  takeErase,
  takeTakeSaveRequest
} from "../../../Actions/take";

const StyledQuestionSharing = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
  margin: 0 auto;
`;
const StyledPager = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1em 4em;
  background: #22313f;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
`;

const mapStateToProps = (state, ownProps) => {
  return {
    article: state.articleReducer,
    pool: state.questionReducer,
    highlights: state.highlightReducer,
    user_detail: state.authReducer.signup.data,
    take: state.takeReducer
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
    markTake: (article_id, question_id, phase = 1) =>
      dispatch(takeMark(article_id, question_id, phase)),
    eraseTake: (article_id, question_id, phase = 1) =>
      dispatch(takeErase(article_id, question_id, phase)),
    activeHighlightMode: take => dispatch(highlightHighlightModeActivate(take)),
    undoHighlightMode: () => dispatch(highlightHighlightModeUndo()),
    applyHighlight: (take_id, found, sentences) =>
      dispatch(highlightHighlightSaveRequest(take_id, found, sentences)),
    hoverEnter: question_ids =>
      dispatch(highlightHighlightHoverEnter(question_ids)),
    hoverLeave: question_ids =>
      dispatch(highlightHighlightHoverLeave(question_ids))
  };
};

const QuestionSharingView = ({
  article,
  pool,
  highlights,
  user_detail: {
    id: user_id,
    profile: { article: article_id, research: research_id }
  },
  take,
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
  const { data: takeRemote } = take;
  const QidOfTakeRemote = takeRemote.map(t => t.question);
  const todos = pool.data.filter(
    question => QidOfTakeRemote.indexOf(question.id) >= 0
  );
  const takes_with_milestone = takeRemote.map(take => {
    const _latest_milestone = take.milestones.reduce(
      (acc, curr) => (acc.id < curr.id ? curr : acc),
      { id: -1 }
    );
    return {
      ...take,
      _latest_milestone
    };
  });

  let todo_take_map = {};
  todos.forEach(
    todo =>
      (todo_take_map[todo.id] = _find(takes_with_milestone, {
        question: todo.id
      }))
  );

  const addQuestion = (typed, phase) => {
    typed = typed.trim();
    if (typed.length === 0) return;
    _addQuestion(typed, phase, research_id, article_id);
  };

  const toggleHighlightMode = (question = null) => {
    activeHighlightMode(todo_take_map[question.id]);
  };

  const cancelHighlight = () => {
    undoHighlightMode();
  };
  const confirmHighlight = () => {
    const { take_id, data: sentences } = highlights.inProgress;
    const { responses: remote_responses } = takes_with_milestone.filter(
      take => take.id === take_id
    )[0]._latest_milestone;

    const remote_sentences = remote_responses.map(r => r.sentence);
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
      const found = true;
      applyHighlight(take_id, found, sentences);
    }
  };

  const confirmTakes = () => {
    // Calculate diff
    const takenQids = take.data.map(t => t.question);
    const progressQids = take.inProgress.data.map(t => t.question_id);
    let to_create = [],
      to_delete = [];
    progressQids.forEach(qid => {
      if (takenQids.indexOf(qid) < 0) {
        to_create.push({ article_id, question_id: qid, phase: 1 });
      }
    });
    takenQids.forEach(qid => {
      if (progressQids.indexOf(qid) < 0) {
        to_delete.push(qid);
      }
    });

    to_delete = take.data
      .filter(t => to_delete.indexOf(t.question) >= 0)
      .map(t => ({ id: t.id, removed_phase: 1 })); // [{id:take_id, removed_phase:1},...]

    nextPage(2, [takeTakeSaveRequest.bind(null, { to_create, to_delete })]);
  };

  const done = () => {
    nextPage(3, []);
  };
  return (
    <React.Fragment>
      {article.data !== null && (
        <React.Fragment>
          <StyledQuestionSharing>
            <Article
              page={page.data}
              todos={todos}
              todoTakeMap={todo_take_map}
              article={article.data}
              highlightActive={highlights.inProgress.data}
              highlightMode={highlights.inProgress.active}
              hoveredQuestionIds={highlights.hover.question_ids}
              hoverEnter={hoverEnter}
              hoverLeave={hoverLeave}
            />
            <QuestionPool
              page={page.data}
              questions={pool.data}
              todos={todos}
              todoTakeMap={todo_take_map}
              article={article.data}
              addQuestion={addQuestion}
              toggleHighlight={toggleHighlightMode}
              highlightActive={highlights.inProgress.data}
              highlightQuestionId={highlights.inProgress.question_id}
              highlightMode={highlights.inProgress.active}
              hoveredQuestionIds={highlights.hover.question_ids}
              hoverEnter={hoverEnter}
              hoverLeave={hoverLeave}
              confirmTakes={confirmTakes}
              cancelHighlight={cancelHighlight}
              confirmHighlight={confirmHighlight}
              done={done}
            />
          </StyledQuestionSharing>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const QuestionSharing = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionSharingView);

export default QuestionSharing;
