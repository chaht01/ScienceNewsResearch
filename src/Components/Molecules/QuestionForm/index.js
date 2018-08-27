import React from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import styled from "styled-components";
import QuestionCRUDModal from "../../Organisms/QuestionCRUDModal";

import "./style.css";
import {
  questionModalOpen,
  questionModalClose
} from "../../../Actions/questionModal";

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px;
  column-gap: 0.5em;
  margin-top: 0.5em;
`;
const mapStateToProps = (state, ownProps) => {
  return {
    article: state.articleReducer.data,
    suggestions: state.questionReducer.suggestions,
    page: state.pageReducer.data,
    isModalOpen: state.questionModalReducer.open
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const QuestionFormView = ({
  isModalOpen,
  onSubmit,
  handleTyped,
  typed,
  clearType,
  page,
  suggestions,

  ...rest
}) => {
  const onChange = event => {
    event.persist();
    handleTyped(event.target.value);
  };

  return (
    <Form {...rest}>
      <FormGrid>
        <Input value={typed} onChange={onChange} />
        <QuestionCRUDModal
          question={{
            typed,
            intention: "",
            code_first: -1,
            code_second: -1,
            id: -1
          }}
          onSubmit={onSubmit}
          trigger={
            <Button positive type="submit">
              add
            </Button>
          }
        />
      </FormGrid>
    </Form>
  );
};

const QuestionForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionFormView);

export default QuestionForm;
