import React, { memo } from "react";
import { headerLinks } from "@/common/local-data";

import { HeaderWrapper } from "./style";

import { NavLink } from "react-router-dom";
// import { SearchOutlined } from "@ant-design/icons";
// import { Input } from "antd";

const Header = memo(() => {
  const showSelectItem = (item, index) => {
    if (index < 3) {
      return (
        <NavLink to={item.link} exact>
          {item.title}
          <i className="sprite_01 icon"></i>
        </NavLink>
      );
    } else {
      return <a href={item.link}>{item.title}</a>;
    }
  };

  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <div className="header-left">
          <a href="#/" className="logo sprite_01">网易云音乐</a>
          <div className="select-list">
            {headerLinks.map((item, index) => {
              return (
                <div className="select-item" key={item.key}>
                  {showSelectItem(item, index)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="header-right">
          {/* <Input placeholder="音乐/电台/电台/用户" prefix={SearchOutlined} /> */}
        </div>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  );
});

export default Header;
