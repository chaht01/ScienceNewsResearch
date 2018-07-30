import styled from "styled-components";
import tinycolor from "tinycolor2";

const theme_color = `#6b6ffb`;
const StyledLink = styled.span`
  color: #6b6ffb;
  cursor: pointer;
  &:hover {
    color: ${tinycolor(theme_color)
      .darken(10)
      .toHexString()};
    text-decoration: underline;
  }
`;

export default StyledLink;
