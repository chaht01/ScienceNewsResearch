import styled from "styled-components";
import { Button } from "semantic-ui-react";
import { colors } from "../../Configs/var";

export const StyledAside = styled.aside`
  width: 460px;
  padding-left: 20px;
  align-self: center;
  height: 100%;
`;
export const StyledSticky = styled.div`
  position: fixed;
  display: flex;
  padding-top: 2em;
  flex-direction: column;
  width: 400px;
  height: 100%;
`;
StyledSticky.Content = styled.div`
  flex: 1;
  overflow-y: auto;
`;

StyledSticky.Scrollable = StyledSticky.Content.extend`
  overflow-y: hidden;
  padding: .6em;
`;

StyledSticky.ScrollablePane = styled.div`
  height: 100%;
  overflow: auto;
`;

StyledSticky.Footer = styled.div`
  justify-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 50px;
`;

StyledSticky.Action = styled(Button)`
  justify-self: flex-end;
`;
StyledSticky.ActionDescription = styled.span`
  justify-self: flex-start;
  color: ${colors.blue};
  flex: 1;
  padding-left: 2em;
`;
