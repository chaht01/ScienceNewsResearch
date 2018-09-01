import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHighlighter } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router";
import "./App.css";
import Sign from "./Components/Pages/Sign";
import PageContainer from "./Components/Pages/PageContainer";
library.add(faHighlighter);

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
