import React from "react";
import SignForm from "../../Organisms/SignForm";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";

const StyledSignContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-bottom: 10vh;
`;

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.authReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

const SignView = ({ auth: { isAuthenticated, token } }) => {
  if (token.length > 0 && isAuthenticated) {
    return <Redirect to="/verified" />;
  }
  return (
    <StyledSignContainer>
      <SignForm />
    </StyledSignContainer>
  );
};

const Sign = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignView);

export default Sign;
