import styled from "styled-components";
import tinycolor from "tinycolor2";

const theme_color = `#6b6ffb`;
const StyledLink = styled.span`
  color: ${props => props.color || theme_color};
  cursor: pointer;
  &:hover {
    color: ${props =>
      tinycolor(props.color || theme_color)
        .darken(10)
        .toHexString()};
    text-decoration: underline;
  }
`;

export default StyledLink;
