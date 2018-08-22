import React from "react";
import styled from "styled-components";
import tinycolor from "tinycolor2";
import { findIndex as _findIndex, flatten as _flatten } from "lodash";
import { connect } from "react-redux";
import PoolExample from "../PoolExample";
import { Button } from "semantic-ui-react";
import {
  questionHighlightMark,
  questionHighlightErase,
  questionHighlightHoverEnter,
  questionHighlightHoverLeave
} from "../../../Actions/questionHighlight";
import { colors } from "../../Configs/var";
import { CSSTransition } from "react-transition-group";
import { PAGES } from "../../../Reducers/page";
import "./style.css";

const FAB = styled(Button)`
  position: sticky;
  left: 100%;
  bottom: 40px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22) !important;
`;
const StyledArticle = styled.div`
  padding: 1em;
  padding-bottom: 100px;
  align-self: center;
  width: 600px;
  margin-bottom: auto;
  margin-top: auto; // overflow hack
`;

const StyledArticleBody = styled.article`
  font-size: 16px;
  line-height: 1.4;
  text-align: justify;
`;

const StyledParagraph = styled.p`
  margin-bottom: 1em;
`;

const StyledSentence = styled.span`
  padding: 0 2px;
  margin: 0 1px;
  ${props =>
    props.hoverable &&
    `
        cursor: pointer;
        border: 1px dashed #aaa;
        &:hover{
            background: ${
              props.opacity > 0
                ? tinycolor(props.highlightColor)
                    .setAlpha(props.opacity * 2.0)
                    .toRgbString()
                : "#e1e1e7"
            };
        }
    `} ${props =>
    props.opacity > 0 &&
    `
        background: ${tinycolor(props.highlightColor)
          .setAlpha(props.opacity)
          .toRgbString()};
        &:hover{
          background: ${tinycolor(props.highlightColor)
            .setAlpha(1)
            .toRgbString()};
        }
    `}
    transition: all .2s;
`;

const ArticleBody = ({
  content,
  highlightMode,
  highlightSentence,
  onHoverEnter,
  onHoverLeave,
  highlightColor
}) => {
  const conditionalHighlight = sentence => {
    if (highlightMode) {
      highlightSentence(sentence);
    }
  };

  let paragrpahed_sentences = [];
  content.sort(
    (a, b) =>
      a.paragraph_order === b.paragraph_order
        ? a.order < b.order
          ? -1
          : 1
        : a.paragraph_order < b.paragraph_order
          ? -1
          : 1
  );
  paragrpahed_sentences.push(
    content.reduce((acc, curr) => {
      if (acc.length === 0) return [curr];
      if (acc[acc.length - 1].paragraph_order !== curr.paragraph_order) {
        paragrpahed_sentences.push(acc);
        return [curr];
      } else {
        return [...acc, curr];
      }
    }, [])
  );
  return (
    <StyledArticleBody>
      {paragrpahed_sentences.map((paragraph, p_idx) => (
        <StyledParagraph key={p_idx}>
          {paragraph.map(sentence => (
            <StyledSentence
              key={sentence.id}
              hoverable={highlightMode}
              onClick={() => conditionalHighlight(sentence)}
              opacity={sentence.opacity}
              onMouseEnter={() => onHoverEnter(sentence.id)}
              onMouseLeave={() => onHoverLeave(sentence.id)}
              highlightColor={highlightColor}
            >
              {sentence.text}
            </StyledSentence>
          ))}
        </StyledParagraph>
      ))}
    </StyledArticleBody>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    folding: state.questionReducer.folding,
    article: state.articleReducer.data,
    user_detail: state.authReducer.signup.data,
    page: state.pageReducer.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    markHighlight: sentence_id => dispatch(questionHighlightMark(sentence_id)),
    eraseHighlight: sentence_id =>
      dispatch(questionHighlightErase(sentence_id)),
    hoverEnter: sentence_id =>
      dispatch(questionHighlightHoverEnter(sentence_id)),
    hoverLeave: sentence_id =>
      dispatch(questionHighlightHoverLeave(sentence_id))
  };
};

const ArticleView = ({
  // ownProps
  startHighlight,
  highlightsAll, // [[]]
  highlights,
  highlightColor,
  bodyVisible,
  onEraseHighlight,
  onMarkHighlight,
  onHoverEnter,
  onHoverLeave,
  // stateToProps
  page,
  article: { title, sentences: content },
  user_detail: { username },

  fab
}) => {
  const {
    inProgress: { data: highlightInProgress, active: highlightMode }
  } = highlights;

  let targetSentences = {};
  let totalDivider = 0;
  if (highlightMode) {
    targetSentences = updateTargetSentence(
      highlightInProgress.map(sentence_id => ({
        [sentence_id]: highlightInProgress.length
      }))
    );
    totalDivider = highlightInProgress.length;
  } else {
    targetSentences = updateTargetSentence(
      _flatten(
        highlightsAll.map(sentenceArr => {
          totalDivider += sentenceArr.length;
          return sentenceArr.map(sentence_id => ({
            [sentence_id]: sentenceArr.length
          }));
        })
      )
    );
  }

  function updateTargetSentence(sentenceDupIds) {
    let targetSentences = {};
    content.forEach(sentence => (targetSentences[sentence.id] = 0));

    sentenceDupIds.forEach(
      id_cnt_pair =>
        (targetSentences[Object.keys(id_cnt_pair)[0]] +=
          id_cnt_pair[Object.keys(id_cnt_pair)[0]])
    );
    return targetSentences;
  }

  const highlightedContent = content.map(sentence => ({
    ...sentence,
    opacity: targetSentences[sentence.id] / Math.max(1, totalDivider)
    // Math.max(1, Object.values(targetSentences).reduce((a, b) => a + b))
  }));

  const highlightSentence = sentence => {
    // Only affect to local (cause it has `confirm` step)
    if (highlightInProgress.filter(s_id => s_id === sentence.id).length > 0) {
      onEraseHighlight(sentence.id);
    } else {
      onMarkHighlight(sentence.id);
    }
  };

  return (
    <StyledArticle>
      <h1>{title}</h1>
      {bodyVisible && (
        <React.Fragment>
          <ArticleBody
            content={highlightedContent}
            highlightMode={highlightMode}
            highlightSentence={highlightSentence}
            onHoverEnter={onHoverEnter}
            onHoverLeave={onHoverLeave}
            highlightColor={highlightColor}
          />
          {fab &&
            !highlightMode && (
              <FAB
                circular
                positive
                icon="tasks"
                size="huge"
                onClick={startHighlight.bind(this, null)}
              />
            )}
        </React.Fragment>
      )}
      {page === PAGES.QUESTIONER_STEP2 && (
        <React.Fragment>
          <h4>Below you can see what questions others raised.</h4>
          <PoolExample questions={[]} /> {/*TODO*/}
        </React.Fragment>
      )}
    </StyledArticle>
  );
};

const Article = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleView);

export default Article;
