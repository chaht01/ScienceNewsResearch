import React from "react";
import styled from "styled-components";

const IndicatorView = styled.span`

`
const Indicator = ({content, children, ...rest}) => {
  return (
    <span>
      {content || children}
    </span>
  )
}

export default Indicator