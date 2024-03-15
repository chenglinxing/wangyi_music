import React, { memo } from "react";
import { NavLink } from "react-router-dom";

import { HeaderWrapper } from "./style";
const Header = memo(() => {
  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <div className="header-left"></div>
        <div className="header-right"></div>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  );
});

export default Header;
