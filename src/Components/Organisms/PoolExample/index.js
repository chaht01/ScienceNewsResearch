import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Menu, Segment } from "semantic-ui-react";
import { filterExampleQuestion } from "../../../Actions/poolExample";

const ExampleQuestion = styled.div`
  padding: 1em;
  border-bottom: 1px solid #e1e1e7;
  &:last-child {
    border-bottom: none;
  }
`;

const mapStateToProps = (state, ownProps) => {
  return {
    filter_item: state.poolExampleReducer.items,
    filteredBy: state.poolExampleReducer.data.selected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filterQuestionType: index => dispatch(filterExampleQuestion(index))
  };
};

const PoolExampleView = ({
  filter_item,
  filteredBy,
  filterQuestionType,
  questions
}) => {
  const static_seed = {
    Background: [
      "Why vitamin B linked to cancer?",
      "What exactly would be considered a high dose?"
    ],
    Research: [
      "Which population has been analyzed in this study?",
      "Who did this study?"
    ],
    Application: [
      "Which B vitamin causes the greatest likelihood of developing lung cancer?",
      "What is the ideal level of B vitamins you should take per day to avoid the cancer risk?"
    ]
  };
  return (
    <React.Fragment>
      <Menu attached="top" compact>
        {filter_item
          .filter(name => static_seed.hasOwnProperty(name))
          .map((name, idx) => (
            <Menu.Item
              key={idx}
              name={name}
              active={filter_item[filteredBy] === name}
              content={name}
              onClick={() => filterQuestionType(idx)}
            />
          ))}
      </Menu>
      <Segment attached="bottom">
        {static_seed[filter_item[filteredBy]].map(text => (
          <ExampleQuestion>{text}</ExampleQuestion>
        ))}
      </Segment>
    </React.Fragment>
  );
};

const PoolExample = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoolExampleView);

export default PoolExample;
