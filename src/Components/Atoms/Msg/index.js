import styled from "styled-components";
import { colors } from "../../Configs/var";
import tinycolor from "tinycolor2";
const stateMapper = {
  success: tinycolor(colors.green)
    .darken(20)
    .toString(),
  error: tinycolor(colors.red)
    .darken(20)
    .toString(),
  warning: tinycolor(colors.yellow)
    .darken(20)
    .toString(),
  info: tinycolor(colors.purple)
    .darken(20)
    .toString()
};

const Msg = styled.div`
  color: ${props => stateMapper[props.state]};
  text-align: center;
`;

export default Msg;
