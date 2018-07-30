import React from "react";
import styled from "styled-components";
import tinycolor from "tinycolor2";
import { connect } from "react-redux";
import {
  highlightHighlightErase,
  highlightHighlightMark
} from "../../../Actions/highlight";

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
        &:hover{
            background: ${
              props.colors.length > 0
                ? `${tinycolor(
                    props.colors.reduce((acc, curr) =>
                      tinycolor
                        .mix(
                          tinycolor(acc),
                          tinycolor(curr),
                          100 / props.colors.length
                        )
                        .toHex()
                    )
                  )
                    .setAlpha(0.45)
                    .toRgbString()}`
                : "#e1e1e7"
            };
        }
    `} ${props =>
    props.colors.length > 0 &&
    `
        background: ${tinycolor(
          props.colors.reduce((acc, curr) =>
            tinycolor
              .mix(tinycolor(acc), tinycolor(curr), 100 / props.colors.length)
              .toHex()
          )
        )
          .setAlpha(0.45)
          .toRgbString()};
        &:hover{
          background: ${tinycolor(
            props.colors.reduce((acc, curr) =>
              tinycolor
                .mix(tinycolor(acc), tinycolor(curr), 100 / props.colors.length)
                .toHex()
            )
          )
            .setAlpha(0.5)
            .toRgbString()};
        }
    `}
    transition: all .2s;
`;

const mapStateToProps = (state, ownProps) => {
  return {
    highlights: state.highlightReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    markHighlight: sentence_id => dispatch(highlightHighlightMark(sentence_id)),
    eraseHighlight: sentence_id =>
      dispatch(highlightHighlightErase(sentence_id))
  };
};

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

const ArticleView = ({
  article: { title, sentences: content },
  page,
  questions,
  hoverEnter,
  hoverLeave,
  highlights,
  todos,
  todoTakeMap,
  eraseHighlight,
  markHighlight
}) => {
  const {
    inProgress: {
      data: highlightInProgress,
      question_id,
      active: highlightMode
    },
    hover: { question_ids: hoveredQuestionIds }
  } = highlights;

  let todosMap = {};
  todos.forEach(todo => (todosMap[todo.id] = todo));

  let targetSentences = [];
  let targetColors = [];

  if (highlightMode) {
    targetSentences = highlightInProgress;
    targetColors = [todosMap[question_id].color];
  } else {
    hoveredQuestionIds.map(qid =>
      todoTakeMap[qid]._latest_milestone.responses
        .filter(r => r.sentence !== null)
        .map(r => targetSentences.push(r.sentence))
    );
    targetColors = hoveredQuestionIds.map(qid => todosMap[qid].color);
  }

  const highlightedContent = content.map(sentence => ({
    ...sentence,
    colors: targetSentences.indexOf(sentence.id) >= 0 ? targetColors : []
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
        <ArticleBody
          content={highlightedContent}
          highlightMode={highlightMode}
          highlightSentence={highlightSentence}
          hoveredQuestionsIds={hoveredQuestionIds}
        />
      )}
    </StyledArticle>
  );
};

const Article = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleView);

export default Article;
