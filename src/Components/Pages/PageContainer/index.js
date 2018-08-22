import React from "react";
import Intro from "../Intro";
import Questioner from "../Questioner";
import Answerer from "../Answerer";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";
import { pageNextRequest } from "../../../Actions/page";
import { PAGES } from "../../../Reducers/page";
import { Button } from "semantic-ui-react";
const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.authReducer,
    page: state.pageReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startQuestionerStep: () =>
      dispatch(pageNextRequest(PAGES.QUESTIONER_STEP1, [])),
    startAnswererStep: () => dispatch(pageNextRequest(PAGES.ANSWERER_STEP1, []))
  };
};

const PageContainerView = ({
  auth,
  page,
  startQuestionerStep,
  startAnswererStep
}) => {
  if (
    auth.token.length === 0 ||
    window.localStorage.getItem("token") === null
  ) {
    return <Redirect to="/" />;
  }
  return (
    <React.Fragment>
      {page.data === PAGES.OVERALL && <Intro />}
      {page.data === PAGES.QUESTIONER_INTRO && (
        <Button onClick={startQuestionerStep} content="start" />
      )}
      {[
        PAGES.QUESTIONER_STEP1,
        PAGES.QUESTIONER_STEP2,
        PAGES.QUESTIONER_STEP3,
        PAGES.QUESTIONER_STEP4
      ].indexOf(page.data) > -1 && <Questioner />}
      {page.data === PAGES.ANSWERER_INTRO && (
        <Button onClick={startAnswererStep} content="start" />
      )}
      {[PAGES.ANSWERER_STEP1, PAGES.ANSWERER_STEP2].indexOf(page.data) > -1 && (
        <Answerer />
      )}
    </React.Fragment>
  );
};

const PageContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageContainerView)
);
export default PageContainer;
