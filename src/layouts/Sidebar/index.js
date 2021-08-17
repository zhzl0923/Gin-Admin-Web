import { Layout } from "antd";
import Logo from "./Logo";
import { MenuContainer as Menu } from "@/containers/Menu";
import PropTypes from "prop-types";

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  return (
    <Sider
      className="h-screen"
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Logo collapsed={collapsed}></Logo>
      <Menu></Menu>
    </Sider>
  );
};

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};

export default Sidebar;
