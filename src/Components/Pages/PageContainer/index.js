import React from "react";
import Intro from "../Intro";
import Questioner from "../Questioner";
import Answerer from "../Answerer";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";
import { pageNextRequest } from "../../../Actions/page";
import { PAGES } from "../../../Reducers/page";
import { Button } from "semantic-ui-react";
import { articleArticleFetchRequest } from "../../../Actions/article";
import { questionPoolFetchRequest } from "../../../Actions/question";
import { codeFetchRequest } from "../../../Actions/code";
const mapStateToProps = (state, ownProps) => {
  return {
    user_detail: state.authReducer.signup.data,
    auth: state.authReducer,
    page: state.pageReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    nextPage: (page, asyncActions) =>
      dispatch(pageNextRequest(page, asyncActions))
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { nextPage } = dispatchProps;
  const create_phase_request = 1;

  let props = {
    ...stateProps,
    ...ownProps
  };

  if (stateProps.user_detail !== null) {
    const {
      id: user_id,
      profile: { article: article_id, research: research_id }
    } = stateProps.user_detail;
    props = {
      ...props,
      startQuestionerStep: () =>
        nextPage(PAGES.QUESTIONER_STEP1, [
          articleArticleFetchRequest.bind(null, article_id),
          questionPoolFetchRequest.bind(
            null,
            research_id,
            create_phase_request
          ),
          codeFetchRequest
        ])
    };
  }
  return {
    ...props,
    ...{
      startQuestionerIntro: () => nextPage(PAGES.QUESTIONER_INTRO, []),
      startAnswererStep: () => nextPage(PAGES.ANSWERER_STEP1, [])
    }
  };
};

const PageContainerView = ({
  auth,
  page,
  startQuestionerIntro,
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
      {page.data === PAGES.OVERALL && <Intro nextPage={startQuestionerIntro} />}
      {page.data === PAGES.QUESTIONER_INTRO && (
        <div>
          <h1>QUESTION PART INSTURCTION</h1>
          <Button onClick={startQuestionerStep} content="start" />
        </div>
      )}
      {[
        PAGES.QUESTIONER_STEP1,
        PAGES.QUESTIONER_STEP2,
        PAGES.QUESTIONER_STEP3,
        PAGES.QUESTIONER_STEP4
      ].indexOf(page.data) > -1 && <Questioner />}
      {page.data === PAGES.ANSWERER_INTRO && (
        <div>
          <h1>ANSWER PART INSTURCTION</h1>
          <Button onClick={startAnswererStep} content="start" />
        </div>
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
    mapDispatchToProps,
    mergeProps
  )(PageContainerView)
);
export default PageContainer;
