import React from "react";
import { connect } from "react-redux";
import { Menu, Segment } from "semantic-ui-react";
import { StyledQuestionText } from "../../../Atoms/StyledQuestion";
import { filterExampleQuestion } from "../../../../Actions/poolExample";

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

export const StyledPoolItem = StyledQuestionText.extend``;

const PoolExampleView = ({
  filter_item,
  filteredBy,
  filterQuestionType,
  questions
}) => {
  return (
    <div>
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
    </div>
  );
};

const PoolExample = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoolExampleView);

export default PoolExample;
