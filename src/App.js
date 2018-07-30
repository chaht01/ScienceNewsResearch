import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router";
import "./App.css";
import Sign from "./Components/Pages/Sign";
import PageContainer from "./Components/Pages/PageContainer";

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.authReducer
  };
};

const AppView = () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={Sign} />
      <Route path="/verified" component={PageContainer} />
    </React.Fragment>
  );
};

const App = withRouter(
  connect(
    mapStateToProps,
    null
  )(AppView)
);

export default App;
