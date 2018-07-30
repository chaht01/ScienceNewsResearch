import React from "react";
import { Icon, Form, Popup, Radio, Modal } from "semantic-ui-react";
import { StyledSegment } from "../../../Atoms/StyledSegment";
import highlightIcon from "../../../../static/highlight_wh.png";
import styled, { css } from "styled-components";
import { StyledQuestionText } from "../../../Atoms/StyledQuestion";
import {
  takeMark,
  takeErase,
  takeDeleteRequest,
  takeResponseUpdateRequest
} from "../../../../Actions/take";
import { connect } from "react-redux";

const TodoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px 50px 50px;
  column-gap: 0.5em;
`;

const StyledTodoContainer = styled.div``;
const StyledTodoHeader = TodoGrid.extend`
  font-size: 12px;
  line-height: 1;
  color: #a9a9a9;
  align-items: flex-end;
  justify-items: center;
  margin-bottom: 0.5em;
`;
const StyledTodo = TodoGrid.extend`
  width: auto;
  margin-bottom: 0.5em;
  align-items: center;
  justify-items: center;
`;

StyledTodo.RadioForm = styled(Form)`
  display: flex;
  grid-column-start: 2;
  grid-column-end: 4;
  width: 100px;
  justify-content: space-evenly;
  align-items: center;
`;

const mapStateToProps = (state, ownProps) => {
  return {
    user_detail: state.authReducer.signup.data,
    takeRemote: state.takeReducer.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteTake: take_id => dispatch(takeDeleteRequest(take_id, 2)),
    updateResponse: (take_id, found) =>
      dispatch(takeResponseUpdateRequest(take_id, found))
  };
};

const TodosView = ({
  content,
  todos,
  todoTakeMap: todo_take_map,
  highlightMode,
  toggleHighlight,
  highlightQuestionId,
  highlightActive,
  hoveredQuestionIds,
  hoverEnter,
  hoverLeave,
  user_detail,
  takeRemote,
  deleteTake,
  updateResponse
}) => {
  const toggle = question => {
    const take_id = takeRemote.filter(t => t.question === question.id)[0].id;
    deleteTake(take_id);
  };

  const updateFound = (take, found) => {
    updateResponse(take.id, found);
  };

  if (todos.length === 0) {
    return (
      <StyledSegment>
        <StyledSegment.Header>No questions yet!</StyledSegment.Header>
      </StyledSegment>
    );
  } else {
    return (
      <StyledSegment>
        <StyledSegment.Header>Let's find!</StyledSegment.Header>
        <StyledTodoContainer>
          <StyledTodoHeader>
            <span>Question</span>
            <span>Found</span>
            <span>Not Found</span>
            <span>Remove</span>
          </StyledTodoHeader>
          {todos.map((todo, todo_i) => (
            <StyledTodo
              key={todo_i}
              onMouseEnter={() => hoverEnter([todo.id])}
              onMouseLeave={() => hoverLeave([todo.id])}
            >
              <StyledQuestionText
                focused={hoveredQuestionIds.indexOf(todo.id) >= 0}
                focusColor={todo.color}
                style={{ cursor: "pointer" }}
                onClick={() => toggleHighlight(todo)}
              >
                {todo.text}
              </StyledQuestionText>

              <StyledTodo.RadioForm>
                <Form.Field style={{ margin: 0 }}>
                  <Popup
                    trigger={
                      <Radio
                        name="radioGroup"
                        value="found"
                        checked={
                          todo_take_map[todo.id]._latest_milestone.found ===
                          true
                        }
                        onChange={() =>
                          updateFound(todo_take_map[todo.id], true)
                        }
                      />
                    }
                    hoverable
                    position="top center"
                    inverted
                    style={{ padding: "10px 10px 6px", cursor: "pointer" }}
                    onClick={() => toggleHighlight(todo)}
                  >
                    <img
                      src={highlightIcon}
                      style={{ width: "20px" }}
                      alt="highlight"
                    />
                  </Popup>
                </Form.Field>
                <Form.Field style={{ margin: 0 }}>
                  <Radio
                    name="radioGroup"
                    value="notFound"
                    checked={
                      todo_take_map[todo.id]._latest_milestone.found === false
                    }
                    onChange={() => updateFound(todo_take_map[todo.id], false)}
                  />
                </Form.Field>
              </StyledTodo.RadioForm>
              <Modal
                trigger={<Icon name={"remove"} style={{ cursor: "pointer" }} />}
                header="Remove Question"
                content={
                  <Modal.Content>
                    <h3>Question </h3>
                    <StyledQuestionText>{todo.text}</StyledQuestionText>
                    <h3>will be removed.</h3>
                  </Modal.Content>
                }
                size="mini"
                actions={[
                  "cancel",
                  {
                    key: "done",
                    content: "Remove",
                    triggerClose: true,
                    color: "red",
                    onClick: () => toggle(todo)
                  }
                ]}
              />
            </StyledTodo>
          ))}
        </StyledTodoContainer>
      </StyledSegment>
    );
  }
};

const Todos = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosView);

export default Todos;
