import React from "react";
import styled from "styled-components";

const StyledSuggestion = styled.ul`
  background: #434343;
  border-radius: 4px;
  padding: 0.8em 1em 0.8em 2em;
  color: #f1f1f5;
`;

StyledSuggestion.Item = styled.li`
  margin-bottom: 0.5em;
`;

const Suggestion = ({ items, author, ...rest }) => {
  return (
    <StyledSuggestion {...rest}>
      {items.map(str => <StyledSuggestion.Item>{str}</StyledSuggestion.Item>)}
    </StyledSuggestion>
  );
};

export default Suggestion;
