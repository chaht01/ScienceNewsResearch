import React from "react";
import {
  Button,
  Form,
  Icon,
  Input,
  Popup,
  Radio,
  Sticky
} from "semantic-ui-react";
import styled from "styled-components";
import Pool from "./Pool";
import Todos from "./Todos";
import SuggestionPreview from "./SuggestionPreview";

const StyledAside = styled.aside`
  width: 400px;
  padding-left: 20px;
  align-self: center;
  height: 100%;
`;
const StyledSticky = styled.div`
  position: fixed;
  display: flex;
  padding-top: 2em;
  flex-direction: column;
  width: 400px;
  height: 100%;
`;
StyledSticky.Content = styled.div`
  flex: 1;
  overflow-y: auto;
`;
StyledSticky.Footer = styled.div`
  justify-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 50px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px;
  column-gap: 0.5em;
`;

class QuestionPool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typed: "",
      folding: true
    };
    this.handleTyped = this.handleTyped.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.spreadPool = this.spreadPool.bind(this);
  }
  handleTyped(e) {
    e.persist();
    this.setState({
      typed: e.target.value
    });
  }
  handleSubmit(e) {
    this.props.addQuestion(this.state.typed, this.props.page);
    this.setState({
      typed: ""
    });
    e.preventDefault();
  }
  spreadPool() {
    this.setState({ folding: false });
  }
  render() {
    const {
      page,
      article: { title, sentences: content },
      done
    } = this.props;
    const {
      highlightMode,
      toggleHighlight,
      highlightQuestionId,
      highlightActive,
      confirmTakes,
      cancelHighlight,
      confirmHighlight
    } = this.props;
    const { hoveredQuestionIds, hoverEnter, hoverLeave } = this.props;
    const { todos, questions, todoTakeMap } = this.props;

    const doneValidation =
      Object.keys(todoTakeMap)
        .map(todo_id => todoTakeMap[todo_id]._latest_milestone.found)
        .indexOf(null) < 0;

    if (highlightMode) {
      const targetQuestion = questions.filter(
        q => q.id === highlightQuestionId
      )[0];
      const highlightedSentences = content
        .filter(s => highlightActive.indexOf(s.id) >= 0)
        .sort((a, b) => (a.order < b.order ? -1 : 1))
        .map(s => s.text);
      return (
        <StyledAside>
          <StyledSticky>
            <StyledSticky.Content>
              <SuggestionPreview
                targetQuestion={targetQuestion}
                highlightedSentences={highlightedSentences}
              />
            </StyledSticky.Content>
            <StyledSticky.Footer>
              <Button onClick={cancelHighlight}>Cancel</Button>
              <Button onClick={confirmHighlight}>Confirm</Button>
            </StyledSticky.Footer>
          </StyledSticky>
        </StyledAside>
      );
    } else {
      return (
        <StyledAside>
          <StyledSticky>
            <StyledSticky.Content>
              <Form
                onSubmit={this.handleSubmit}
                onChange={this.handleTyped}
                style={{ marginBottom: "2em" }}
              >
                <h3>What do you want to know?</h3>
                <FormGrid>
                  <Input
                    type="text"
                    placeholder={"What do you want to know?"}
                    value={this.state.typed}
                  />
                  <Button type="submit">add</Button>
                </FormGrid>
              </Form>

              {page === 1 ? (
                <Pool
                  questions={questions}
                  folding={this.state.folding}
                  spreadPool={this.spreadPool}
                />
              ) : page === 2 ? (
                <Todos
                  content={content}
                  todos={todos}
                  todoTakeMap={todoTakeMap}
                  highlightMode={highlightMode}
                  toggleHighlight={toggleHighlight}
                  hoverEnter={hoverEnter}
                  hoverLeave={hoverLeave}
                  highlightQuestionId={highlightQuestionId}
                  highlightActive={highlightActive}
                  hoveredQuestionIds={hoveredQuestionIds}
                />
              ) : null}
            </StyledSticky.Content>
            <StyledSticky.Footer>
              {page === 1 ? (
                <Button
                  onClick={confirmTakes}
                  disabled={page.loading}
                  loading={page.loading}
                >
                  Next
                </Button>
              ) : page === 2 ? (
                <Button
                  onClick={done}
                  disabled={page.loading || !doneValidation}
                  loading={page.loading}
                >
                  Done
                </Button>
              ) : null}
            </StyledSticky.Footer>
          </StyledSticky>
        </StyledAside>
      );
    }
  }
}

export default QuestionPool;
