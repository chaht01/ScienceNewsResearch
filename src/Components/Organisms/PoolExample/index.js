import React from "react";
import { connect } from "react-redux";
import { Menu, Segment } from "semantic-ui-react";
import { filterExampleQuestion } from "../../../Actions/poolExample";

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
  return (
    <React.Fragment>
      <Menu attached="top" compact>
        {filter_item.map((name, idx) => (
          <Menu.Item
            key={idx}
            name={name}
            active={filter_item[filteredBy] === name}
            content={name}
            onClick={() => filterQuestionType(idx)}
          />
        ))}
      </Menu>
      <Segment attached="bottom">{filter_item[filteredBy]}</Segment>
    </React.Fragment>
  );
};

const PoolExample = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoolExampleView);

export default PoolExample;
