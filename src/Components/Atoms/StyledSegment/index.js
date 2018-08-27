import styled from "styled-components";

export const StyledSegment = styled.div`
  padding: 1em 1.2em;
  border-radius: 4px;
  border: 1px solid #f1f1f5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;
StyledSegment.Header = styled.h3`
  position: relative;
`;
StyledSegment.Pane = styled.div`
  border-radius: 4px;
  padding: 0.6em;
`;
