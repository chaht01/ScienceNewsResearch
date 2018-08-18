import React from "react";
import styled from "styled-components";
import tinycolor from "tinycolor2";
import { findIndex as _findIndex, flatten as _flatten } from "lodash";
import { connect } from "react-redux";
import PoolExample from "../QuesitonPool/PoolExample";
import { Button } from "semantic-ui-react";
import {
  questionHighlightMark,
  questionHighlightErase
} from "../../../Actions/questionHighlight";
import { colors } from "../../Configs/var";

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
              props.colors > 0
                ? tinycolor(colors.green)
                    .setAlpha(props.color * 1.1)
                    .toRgbString()
                : "#e1e1e7"
            };
        }
    `} ${props =>
    props.colors > 0 &&
    `
        background: ${tinycolor(colors.green)
          .setAlpha(props.color)
          .toRgbString()};
        &:hover{
          background: ${tinycolor(colors.green)
            .setAlpha(props.color * 1.1)
            .toRgbString()};
        }
    `}
    transition: all .2s;
`;

const ArticleBody = ({
  content,
  highlightMode,
  highlightSentence,
  hoverQuestionIds
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
              colors={sentence.colors}
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
    highlights: state.questionHighlightReducer,
    folding: state.questionReducer.folding,
    article: state.articleReducer.data,
    questions: state.questionReducer.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    markHighlight: sentence_id => dispatch(questionHighlightMark(sentence_id)),
    eraseHighlight: sentence_id => dispatch(questionHighlightErase(sentence_id))
  };
};

const ArticleView = ({
  // ownProps
  page,
  toggleHighlight,

  // stateToProps
  article: { title, sentences: content },
  questions,
  highlights,
  eraseHighlight,
  markHighlight,
  folding
}) => {
  const {
    inProgress: {
      data: highlightInProgress,
      question_id,
      active: highlightMode
    },
    hover: { question_ids: hoveredQuestionIds }
  } = highlights;

  let targetSentences = {};

  if (highlightMode) {
    targetSentences = updateTargetSentence(highlightInProgress);
  } else {
    targetSentences = updateTargetSentence(
      _flatten(
        hoveredQuestionIds.map(qid => {
          const fIdx = _findIndex(highlights.data, { id: qid });
          if (fIdx > -1) {
            return highlights.data[fIdx].refText;
          }
        })
      )
    );
  }

  function updateTargetSentence(sentenceDupIds) {
    let targetSentences = {};
    content.forEach(sentence => (targetSentences[sentence.id] = 0));

    sentenceDupIds.forEach(id => targetSentences[id]++);
    return targetSentences;
  }

  const highlightedContent = content.map(sentence => ({
    ...sentence,
    colors:
      targetSentences[sentence.id] /
      Object.values(targetSentences).reduce((a, b) => a + b)
  }));

  const highlightSentence = sentence => {
    // Only affect to local (cause it has `confirm` step)
    if (highlightInProgress.filter(s_id => s_id === sentence.id).length > 0) {
      eraseHighlight(sentence.id);
    } else {
      markHighlight(sentence.id);
    }
  };

  return (
    <StyledArticle>
      <h1>{title}</h1>
      {page === 2 && (
        <React.Fragment>
          <ArticleBody
            content={highlightedContent}
            highlightMode={highlightMode}
            highlightSentence={highlightSentence}
            hoveredQuestionsIds={hoveredQuestionIds}
          />
          {!highlightMode && (
            <FAB
              circular
              positive
              icon="plus"
              size="huge"
              onClick={toggleHighlight}
            />
          )}
        </React.Fragment>
      )}

      {!folding &&
        page === 1 && (
          <React.Fragment>
            <h4>Below you can see what questions others raised.</h4>
            <PoolExample questions={questions} />
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
