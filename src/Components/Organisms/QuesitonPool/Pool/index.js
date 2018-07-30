import React from "react";
import StyledLink from "../../../Atoms/StyledLink";
import { StyledQuestionText } from "../../../Atoms/StyledQuestion";
import styled from "styled-components";
import tinycolor from "tinycolor2";
import { connect } from "react-redux";
import { takeMark, takeErase } from "../../../../Actions/take";

export const StyledPool = styled.div`
  border-radius: 4px;
  background: #eeeeee;
  padding: 0.6em 0.6em;
`;

export const StyledPoolItem = StyledQuestionText.extend`
  display: flex;
  justify-content: space-between;
  border-radius: 6px;
  margin-bottom: 0.5em;
  border: 1px solid #e1e1e7;
  &:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border-color: #fff;
  }
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
`;
StyledPoolItem.Text = styled.span`
  flex: 1;
  &:before {
    content: "Q. ";
    font-size: 16px;
    color: #222;
  }
`;
StyledPoolItem.Status = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  border: 1.5px solid
    ${props =>
      props.checked
        ? tinycolor(`#6B6FFB`)
            .lighten(20)
            .toHexString()
        : `#e1e1e7`};
  background: ${props => (props.checked ? `#6B6FFB` : `transparent`)};
  transition: background 0.1s;
`;

const mapStateToProps = (state, ownProps) => {
  return {
    article: state.articleReducer.data,
    user_detail: state.authReducer.signup.data,
    takeInProgress: state.takeReducer.inProgress.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    markTake: (article_id, question_id, phase = 1) =>
      dispatch(takeMark(article_id, question_id, phase)),
    eraseTake: (article_id, question_id, phase = 1) =>
      dispatch(takeErase(article_id, question_id, phase))
  };
};

const PoolView = ({
  questions,
  folding,
  spreadPool,
  user_detail: { username },
  takeInProgress,
  eraseTake,
  article,
  markTake
}) => {
  const QidOfTakeInProgress = takeInProgress.map(t => t.question_id);

  const toggle = question => {
    if (takeInProgress.filter(t => t.question_id === question.id).length > 0) {
      eraseTake(article.id, question.id);
    } else {
      markTake(article.id, question.id);
    }
  };

  return (
    <StyledPool>
      {folding && (
        <StyledLink onClick={spreadPool}>
          Choose from other users' questions
        </StyledLink>
      )}
      {questions
        .filter(
          question =>
            folding
              ? QidOfTakeInProgress.indexOf(question.id) >= 0 ||
                question.owner === username
              : true
        )
        .map(question => (
          <StyledPoolItem
            key={question.id}
            onClick={() => toggle(question)}
            checked={QidOfTakeInProgress.indexOf(question.id) >= 0}
          >
            <StyledPoolItem.Text>{question.text}</StyledPoolItem.Text>
            <StyledPoolItem.Status
              checked={QidOfTakeInProgress.indexOf(question.id) >= 0}
            />
          </StyledPoolItem>
        ))}
    </StyledPool>
  );
};

const Pool = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoolView);

export default Pool;
