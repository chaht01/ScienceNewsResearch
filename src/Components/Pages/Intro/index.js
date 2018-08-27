import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { articleArticleFetchRequest } from "../../../Actions/article";
import { questionPoolFetchRequest } from "../../../Actions/question";
import { codeFetchRequest } from "../../../Actions/code";
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
  return {};
};

const IntroView = ({ user_detail, page, nextPage }) => {
  const {
    id: user_id,
    profile: { article: article_id, research: research_id }
  } = user_detail;
  const { loading } = page;

  return (
    <StyledIntro>
      <h1>OVERALL INSTRUCTION</h1>
      <Button onClick={nextPage} loading={loading} disabled={loading}>
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
