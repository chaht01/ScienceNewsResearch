import React from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import styled from "styled-components";
import Autosuggest from "react-autosuggest";
import { takeMark, takeCreateRequest } from "../../../../Actions/take";

import "./style.css";

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px;
  column-gap: 0.5em;
`;
const mapStateToProps = (state, ownProps) => {
  return {
    article: state.articleReducer.data,
    suggestions: state.questionReducer.suggestions,
    page: state.pageReducer.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    _markTake: (article_id, phase, question_id) =>
      dispatch(takeMark(article_id, question_id, phase)),
    _reqeustTake: (article_id, phase, question_id) =>
      dispatch(takeCreateRequest(article_id, question_id, phase))
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    article: { id: article_id },
    page
  } = stateProps;
  const { _markTake, _reqeustTake } = dispatchProps;
  return {
    ...stateProps,
    ...ownProps,
    markTake: _markTake.bind(null, article_id, page),
    reqeustTake: _reqeustTake.bind(null, article_id, page)
  };
};

const QuestionFormView = ({
  handleSubmit,
  handleTyped,
  typed,
  clearType,
  page,
  questions,
  suggestions,
  markTake,
  reqeustTake
}) => {
  const getSuggestionValue = suggestion => suggestion.text;
  const renderSuggestion = (suggestion, { query, isHighlighted }) => (
    <div>{suggestion.text}</div>
  );
  const onChange = (event, { newValue, method }) => {
    if (["enter", "click"].indexOf(method) >= 0) {
      handleTyped(newValue);
    } else {
      event.persist();
      handleTyped(event.target.value);
    }
  };
  const inputProps = {
    placeholder: "What do you want to know?",
    value: typed,
    onChange
  };
  const onSuggestionSelected = (
    e,
    {
      suggestion: suggestedQuestion,
      suggestionValue,
      suggestionIndex,
      sectionIndex,
      method
    }
  ) => {
    if (page === 1) {
      markTake(suggestedQuestion.id);
    } else if (page === 2) {
      reqeustTake(suggestedQuestion.id);
    }
    clearType();
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <Form onSubmit={handleSubmit} style={{ marginBottom: "2em" }}>
      <h3>What do you want to know?</h3>
      <FormGrid>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={() => {}}
          onSuggestionsClearRequested={() => {}}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={onSuggestionSelected}
          inputProps={inputProps}
        />
        <Button type="submit">add</Button>
      </FormGrid>
    </Form>
  );
};

const QuestionForm = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(QuestionFormView);

export default QuestionForm;
