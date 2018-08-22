import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { articleArticleFetchRequest } from "../../../Actions/article";
import { questionPoolFetchRequest } from "../../../Actions/question";
import { takeListFetchRequest } from "../../../Actions/take";
import { highlightHighlightFetchRequest } from "../../../Actions/highlight";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import { pageNextRequest } from "../../../Actions/page";
import { PAGES } from "../../../Reducers/page";

const StyledContainer = styled.div`
  padding-top: 3em;
`;

const StyledIntro = styled.div`
  max-width: 800px;
  margin: auto;
  margin-top: 3em;
`;

const mapStateToProps = (state, ownProps) => {
  return {
    user_detail: state.authReducer.signup.data,
    page: state.pageReducer.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    nextPage: asyncActions =>
      dispatch(pageNextRequest(PAGES.QUESTIONER_INTRO, asyncActions))
  };
};

const IntroView = ({ user_detail, page, nextPage }) => {
  const {
    id: user_id,
    profile: { article: article_id, research: research_id }
  } = user_detail;
  const { loading } = page;

  const create_phase_request = 1;
  const toQuestionerIntro = nextPage.bind(this, [
    articleArticleFetchRequest.bind(null, article_id),
    questionPoolFetchRequest.bind(null, research_id, create_phase_request),
    takeListFetchRequest.bind(null, user_id)
  ]);
  return (
    <StyledIntro>
      <h1>Some Introduction</h1>
      <div>Hello article</div>
      <Button onClick={toQuestionerIntro} loading={loading} disabled={loading}>
        Next
      </Button>
    </StyledIntro>
  );
};

const Intro = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroView);

export default Intro;
