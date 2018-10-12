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
import { shownFetchRequest } from "../../../Actions/shown";
import StyledLink from "../../Atoms/StyledLink";
import TitleQuestionerIntro from "../TitleQuestionerIntro";
import BodyQuestionerIntro from "../BodyQuestionerIntro";
import AnswererIntro from "../AnswererIntro";
const mapStateToProps = (state, ownProps) => {
  return {
    user_detail: state.authReducer.signup.data,
    auth: state.authReducer,
    page: state.pageReducer,
    article: state.articleReducer,
    questions: state.questionReducer,
    code: state.codeReducer,
    shown: state.shownReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    nextPage: (page, asyncActions) => dispatch(pageNextRequest(page, asyncActions))
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { nextPage } = dispatchProps;
  const create_phase_request = 1;

  let props = {
    ...stateProps,
    ...ownProps
  };
  const { article, questions, code, shown } = stateProps;
  if (stateProps.user_detail !== null) {
    const {
      id: user_id,
      profile: { article: article_id, research: research_id }
    } = stateProps.user_detail;

    props = {
      ...props,
      startTitleQuestionerStep: () =>
        nextPage(PAGES.QUESTIONER_STEP1, [
          articleArticleFetchRequest.bind(null, article_id),
          questionPoolFetchRequest.bind(null, article_id, create_phase_request),
          codeFetchRequest
        ]),
      startBodyQuestionerStep: () =>
        nextPage(PAGES.QUESTIONER_STEP3, [
          articleArticleFetchRequest.bind(null, article_id),
          questionPoolFetchRequest.bind(null, article_id, create_phase_request),
          codeFetchRequest
        ])
        ,
      questionStepLoading: article.loading || questions.loading || code.loading
    };
  }
  return {
    ...props,
    ...{
      startTitleQuestionerIntro: () => nextPage(PAGES.TITLEQUESTIONER_INTRO, []),
      startBodyQuestionerIntro: () => nextPage(PAGES.BODYQUESTIONER_INTRO, []),
      startAnswererStep: () =>
        nextPage(PAGES.ANSWERER_STEP1, [
          shownFetchRequest.bind(null, shown.call_cnt)
        ]),
      answerStepLoading: shown.loading && shown.call_cnt === 0
    }
  };
};

const PageContainerView = ({
  auth,
  page,
  startTitleQuestionerIntro,
  startBodyQuestionerIntro,
  questionStepLoading,
  startTitleQuestionerStep,
  startBodyQuestionerStep,
  startAnswererStep,
  answerStepLoading
}) => {
  window.onbeforeunload = function() {
    return "Your work will be lost.";
  };
  if (
    auth.token.length === 0 ||
    window.localStorage.getItem("token") === null
  ) {
    return <Redirect to="/" />;
  }
  return (
    <React.Fragment>
      {page.data === PAGES.OVERALL && <Intro nextPage={startTitleQuestionerIntro} />}
      {page.data === PAGES.TITLEQUESTIONER_INTRO && (
        <TitleQuestionerIntro nextPage={startTitleQuestionerStep} />
      )}
      {page.data === PAGES.QUESTIONER_STEP2 && <Questioner loading={questionStepLoading} nextPage={startBodyQuestionerIntro} />}
      {page.data === PAGES.BODYQUESTIONER_INTRO && (
        <BodyQuestionerIntro nextPage={startBodyQuestionerStep} />
      )}
      {[
        PAGES.QUESTIONER_STEP1,
        PAGES.QUESTIONER_STEP3,
        PAGES.QUESTIONER_STEP4
      ].indexOf(page.data) > -1 && <Questioner loading={questionStepLoading} />}
      {page.data === PAGES.ANSWERER_INTRO && (
        <AnswererIntro nextPage={startAnswererStep} />
      )}
      {PAGES.ANSWERER_STEP1 === page.data && (
        <Answerer loading={answerStepLoading} />
      )}
      {PAGES.PRESURVEY === page.data && <Presurvey />}
    </React.Fragment>
  );
};

class Presurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remains: 5,
      force: false
    };
    this.forceStart = this.forceStart.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(prevState => ({
        remains: prevState.remains - 1
      }));
    }, 1000);
  }
  forceStart() {
    this.setState(prevState => ({
      ...prevState,
      force: true
    }));
  }
  render() {
    const { remains, force } = this.state;
    if (remains >= 0 && !force) {
      return (
        <div>
          Thank you for your participation. This page will redirect to survey
          page after {remains} sec or{" "}
          <StyledLink onClick={this.forceStart}>go now</StyledLink>
        </div>
      );
    } else {
      window.onbeforeunload = null;
      return <Redirect to="/survey" />;
    }
  }
}

const PageContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(PageContainerView)
);
export default PageContainer;
