import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

const AnswererView = () => {
  return <div />;
};

const Answerer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswererView);

export default Answerer;
