import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { articleArticleFetchRequest } from "../../../Actions/article";
import { questionPoolFetchRequest } from "../../../Actions/question";
import { takeListFetchRequest } from "../../../Actions/take";
import { highlightHighlightFetchRequest } from "../../../Actions/highlight";
import { Button } from "semantic-ui-react";
import styled from "styled-components";

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
    user_detail: state.authReducer.signup.data
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const IntroView = ({ user_detail, nextPage, page }) => {
  const {
    id: user_id,
    profile: { article: article_id, research: research_id }
  } = user_detail;
  const { loading } = page;

  const create_phase_request = 1;
  const nextPageAsync = nextPage.bind(null, 1, [
    articleArticleFetchRequest.bind(null, article_id),
    questionPoolFetchRequest.bind(null, research_id, create_phase_request),
    takeListFetchRequest.bind(null, user_id)
  ]);
  return (
    <StyledIntro>
      <h1>Some Introduction</h1>
      <div>Hello article</div>
      <Button onClick={nextPageAsync} loading={loading} disabled={loading}>
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
