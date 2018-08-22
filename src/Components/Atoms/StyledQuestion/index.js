import styled from "styled-components";

export const StyledQuestionText = styled.div`
  width: 100%;
  flex: 1;
  border-radius: 4px;
  border: 2px solid
    ${props => (props.focused ? `#${props.focusColor}` : "#e1e1e7")};
  padding: 0.6em 0.8em;
  transition: all 0.2s;
  text-overflow: ellipsis;
  overflow: hidden;
  overflow-wrap: break-word;
  background: #fff;
`;
