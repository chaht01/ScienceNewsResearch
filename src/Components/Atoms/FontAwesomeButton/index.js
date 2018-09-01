import styled from "styled-components";
import { Button } from "semantic-ui-react";

const FontAwesomeButton = styled(Button)`
  & > .icon {
    font-family: "Font Awesome 5 Free" !important;
    font-weight: 900 !important;
  }
`;

export default FontAwesomeButton;
