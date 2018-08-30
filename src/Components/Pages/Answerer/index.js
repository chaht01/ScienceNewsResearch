import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { PAGES } from "../../../Reducers/page";
import Article from "../../Organisms/Article";
import AnswerPool from "../../Organisms/AnswerPool";
import {
  answerHighlightModeActivate,
  answerHighlightModeUndo,
  answerHighlightMark,
  answerHighlightErase,
  answerHighlightHoverEnter,
  answerHighlightHoverLeave
} from "../../../Actions/answerHighlight";
import { colors } from "../../Configs/var";
import {
  shownFetchRequest,
  shownAnswerHighlightRequest
} from "../../../Actions/shown";
import { Loader } from "../../../../node_modules/semantic-ui-react";

const StyledAnswerer = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
  margin: 0 auto;
`;
const mapStateToProps = (state, ownProps) => {
  return {
    article: state.articleReducer,
    page: state.pageReducer.data,
    user_detail: state.authReducer.signup.data,
    highlights: state.answerHighlightReducer,
    showns: state.shownReducer.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    activeHighlightMode: ({ article_id, shown }) =>
      dispatch(answerHighlightModeActivate({ article_id, shown })),
    undoHighlightMode: () => dispatch(answerHighlightModeUndo()),
    markHighlight: sentence_id => dispatch(answerHighlightMark(sentence_id)),
    eraseHighlight: sentence_id => dispatch(answerHighlightErase(sentence_id)),
    hoverEnter: sentence_id => dispatch(answerHighlightHoverEnter(sentence_id)),
    hoverLeave: sentence_id => dispatch(answerHighlightHoverLeave(sentence_id)),
    updateShown: (shown_id, sentence_ids) =>
      dispatch(shownAnswerHighlightRequest(shown_id, sentence_ids))
  };
};

const AnswererView = ({
  //ownProps

  //stateToProps
  article,
  page,
  showns,
  user_detail: {
    id: user_id,
    profile: { article: article_id, research: research_id },
    username
  },
  highlights,
  activeHighlightMode,
  undoHighlightMode,
  eraseHighlight,
  markHighlight,
  hoverEnter,
  hoverLeave,
  updateShown,
  loading: pageLoading
}) => {
  const startHighlight = shown => {
    if (shown) {
      activeHighlightMode({ article_id, shown });
    }
  };
  const cancelHighlight = () => {
    undoHighlightMode();
  };
  const confirmHighlight = () => {
    const { shown: targetShown, data: sentence_ids } = highlights.inProgress;
    updateShown(targetShown.id, sentence_ids);
  };
  const latestShown = showns.map(shown => ({
    ...shown,
    _latest_take: shown.takes.reduce((a, b) => (b.id > a.id ? b : a))
  }));
  const sentences_on_highlights = latestShown.map(shown =>
    shown._latest_take.answertexts.map(at => at.sentence)
  );

  return (
    <React.Fragment>
      {pageLoading ? (
        <Loader active />
      ) : (
        <StyledAnswerer>
          <Article
            highlights={highlights}
            highlightsAll={sentences_on_highlights}
            highlightColor={colors.pink}
            bodyVisible={true}
            onEraseHighlight={eraseHighlight}
            onMarkHighlight={markHighlight}
            onHoverEnter={hoverEnter}
            onHoverLeave={hoverLeave}
          />
          <AnswerPool
            startHighlight={startHighlight}
            cancelHighlight={cancelHighlight}
            onConfirmHighlight={confirmHighlight}
          />
        </StyledAnswerer>
      )}
    </React.Fragment>
  );
};

const Answerer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswererView);

export default Answerer;
