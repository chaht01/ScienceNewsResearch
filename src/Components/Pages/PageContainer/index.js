import React from "react";
import Intro from "../Intro";
import Questioner from "../Questioner";
import Answerer from "../Answerer";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";
import { pageNextRequest } from "../../../Actions/page";

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.authReducer,
    page: state.pageReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    nextPage: (page, asyncParams) =>
      dispatch(pageNextRequest(page, asyncParams))
  };
};

const PageContainerView = ({ auth, page, nextPage }) => {
  const pageStatus = {
    nextPage,
    page
  };
  if (
    auth.token.length === 0 ||
    window.localStorage.getItem("token") === null
  ) {
    return <Redirect to="/" />;
  }
  return (
    <React.Fragment>
      {page.data === 0 ? (
        <Intro {...pageStatus} />
      ) : (
        <Questioner {...pageStatus} />
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
