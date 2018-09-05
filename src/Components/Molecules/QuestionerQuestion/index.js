import React from "react";
import styled from "styled-components";
import { colors } from "../../Configs/var";
import { Button } from "semantic-ui-react";
import StyledLink from "../../Atoms/StyledLink";
import QuestionCRUDModal from "../../Organisms/QuestionCRUDModal";
import FontAwesomeButton from "../../Atoms/FontAwesomeButton";

const QuestionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 140px;
  grid-row-gap: 0.4em;
  margin-bottom: 0.4em;
  align-items: center;
`;

const StyledQuestion = styled.div`
  background: #fff;
  border: ${props => (props.focused ? `2px` : `1px`)} solid
    ${props => (props.focused ? colors.green : `#ddd`)};
  border-radius: 4px;
  padding: 0.6em 1em ${props => (props.expanded ? "0.6em" : "0.4em")};
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

const QuestionerQuestion = ({
  question,
  editable,
  onEdit,
  onDelete,
  annotable,
  reAnnotate,
  expanded,
  onExpandChange,
  focused
}) => {
  if (question === undefined) {
    return <StyledQuestion>loading...</StyledQuestion>;
  }
  const { id, text, intention, code_first, code_second } = question;
  return (
    <StyledQuestion expanded={expanded} focused={focused}>
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
          {expanded ? "fold" : "see more"}
        </StyledLink>
      </QuestionGrid>
      {expanded && (
        <React.Fragment>
          <StyledQuestion.Intention>{intention}</StyledQuestion.Intention>
          {(editable || annotable) && (
            <Button.Group fluid basic>
              {annotable && (
                <FontAwesomeButton
                  compact
                  icon="fas fa-highlighter"
                  onClick={reAnnotate}
                />
              )}
              {editable && (
                <React.Fragment>
                  <QuestionCRUDModal
                    question={{
                      ...question,
                      typed: text,
                      code_first: code_first.id,
                      code_second: code_second === null ? -1 : code_second.id
                    }}
                    onSubmit={onEdit}
                    trigger={<Button compact icon="edit" />}
                  />
                  <Button compact icon="trash alternate" onClick={onDelete} />
                </React.Fragment>
              )}
            </Button.Group>
          )}
        </React.Fragment>
      )}
    </StyledQuestion>
  );
};

export default QuestionerQuestion;
