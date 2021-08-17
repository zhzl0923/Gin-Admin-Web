import { useState } from "react";
import { Menu as AntdMenu } from "antd";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/Icon";
import PropTypes from "prop-types";

const { SubMenu } = AntdMenu;
const Menu = ({ Routers }) => {
  const location = useLocation();
  const defaultSelectedKeys = [location.pathname.substr(1)];
  const defaultOpenKeys = [
    ...location.pathname.split("/").filter((v) => v),
    location.pathname,
  ];
  const [openKeys, setOpenKeys] = useState(defaultOpenKeys);
  const onMenuChange = (keys) => {
    if (keys) {
      setOpenKeys(keys);
    } else {
      setOpenKeys([]);
    }
  };
  const onMenuClick = (item) => {
    setOpenKeys(item.keyPath.filter((v) => v));
  };

  return (
    <AntdMenu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={defaultSelectedKeys}
      openKeys={openKeys}
      onOpenChange={onMenuChange}
      onClick={onMenuClick}
    >
      {Routers.map((route, index) => {
        if (route.component) {
          return (
            <AntdMenu.Item
              key={route.path.substr(1)}
              icon={route.meta.icon ? <Icon type={route.meta.icon}></Icon> : ""}
            >
              <Link to={route.path}>{route.title}</Link>
            </AntdMenu.Item>
          );
        } else {
          return (
            <SubMenu
              key={route.path.substr(1)}
              title={route.title}
              icon={route.meta.icon ? <Icon type={route.meta.icon}></Icon> : ""}
            >
              {route.routes.map((r, i) => {
                return (
                  <AntdMenu.Item key={route.path.substr(1) + r.path}>
                    <Link to={route.path + r.path}>{r.title}</Link>
                  </AntdMenu.Item>
                );
              })}
            </SubMenu>
          );
        }
      })}
    </AntdMenu>
  );
};

Menu.prototype = {
  Routers: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      component: PropTypes.func,
      title: PropTypes.string.isRequired,
      exact: PropTypes.bool.isRequired,
      meta: PropTypes.shape({ icon: PropTypes.string }),
      routes: PropTypes.array,
    })
  ).isRequired,
};

export default Menu;
