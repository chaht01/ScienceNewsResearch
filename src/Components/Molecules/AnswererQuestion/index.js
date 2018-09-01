import React from "react";
import styled from "styled-components";
import { colors } from "../../Configs/var";
import { Button } from "semantic-ui-react";
import { isFunction as _isFunction } from "lodash";
import StyledLink from "../../Atoms/StyledLink";
import tinycolor from "tinycolor2";

const QuestionAnsweredButton = styled(Button)`
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
  ${props =>
    props.answered &&
    `
    background: ${colors.pink} !important;
    color: #fff !important;
    &:hover{
      background: ${tinycolor(colors.pink).darken()} !important;
      color: #fff !important;
    }
  `};
`;

const QuestionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 140px;
  grid-row-gap: 0.4em;
  margin-bottom: 0.4em;
  align-items: center;
`;

const StyledQuestion = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: all 0.2s;
  margin-bottom: 1em;
  &:last-child {
    margin-bottom: 0;
  }
  ${props =>
    props.expanded &&
    `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);`} &:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
`;
StyledQuestion.Inner = styled.div`
  padding: 0.6em 1em 0.4em;
`;

StyledQuestion.Text = styled.div`
  flex: 1;
  padding-left: 1.4em;
  padding-right: 0.4em;
  position: relative;
  &:before {
    position: absolute;
    content: "Q.";
    font-size: 14px;
    margin-left: -1.4em;
  }
`;

StyledQuestion.ArticleInfo = styled.div`
  position: relative;
  padding: 1em 0.4em;
  margin-top: 1em;
  margin-bottom: -1em;
  font-family: "Abril Fatface", cursive;
  &:before {
    display: block;
    position: absolute;
    top: 1em;
    transform: translateY(-80%);
    content: "This article was made from";
    font-family: initial;
    font-size: 0.8em;
    left: 0;
    text-decoration: underline;
  }
`;

StyledQuestion.Intention = styled.div`
  position: relative;
  padding: 1em 0.4em;
  margin-top: 1em;
  font-style: italic;
  &:before {
    display: block;
    position: absolute;
    top: 1em;
    transform: translateY(-80%);
    content: "It will help";
    font-size: 0.8em;
    left: 0;
    text-decoration: underline;
  }
`;

const StyledLabelGroup = styled.div`
  display: flex;
  font-size: 0.8em;
`;

const StyledLabel = styled.span`
  position: relative;
  border-radius: 4px;
  padding: 0.2em 0.8em;
  border-radius: 16px;
  background: #ddd;
  margin-left: 1em;
  &:before {
    content: "";
    background: #ddd;
    display: block;
    position: absolute;
    width: 1em;
    height: 2px;
    left: 0;
    margin-left: -1em;
    top: 50%;
  }
  &:first-child {
    margin-left: 0;
  }
  &:first-child:before {
    display: none;
    margin: 0;
  }
`;

const AnswererQuestion = ({
  question,
  answered,
  expanded,
  startHighlight,
  onExpandChange
}) => {
  if (question === undefined) {
    return <StyledQuestion>loading...</StyledQuestion>;
  }
  const {
    id,
    text,
    intention,
    code_first,
    code_second,
    article_title
  } = question;

  return (
    <StyledQuestion expanded={expanded}>
      <StyledQuestion.Inner>
        <QuestionGrid>
          <StyledQuestion.Text>{text}</StyledQuestion.Text>
        </QuestionGrid>

        <QuestionGrid>
          <StyledLabelGroup>
            <StyledLabel>{code_first.text}</StyledLabel>
            {code_second && <StyledLabel>{code_second.text}</StyledLabel>}
          </StyledLabelGroup>
          <StyledLink
            color={colors.gray_font}
            style={{ textAlign: "center" }}
            onClick={onExpandChange}
          >
            {expanded ? "fold" : "see askers’ intention"}
          </StyledLink>
        </QuestionGrid>
        <StyledQuestion.ArticleInfo>{article_title}</StyledQuestion.ArticleInfo>
        {expanded && (
          <StyledQuestion.Intention>{intention}</StyledQuestion.Intention>
        )}
      </StyledQuestion.Inner>

      {startHighlight &&
        _isFunction(startHighlight) && (
          <QuestionAnsweredButton
            fluid
            compact
            content={answered ? `See my answer` : `Answer`}
            basic={!answered}
            answered={answered}
            onClick={() => startHighlight()}
          />
        )}
    </StyledQuestion>
  );
};

export default AnswererQuestion;
