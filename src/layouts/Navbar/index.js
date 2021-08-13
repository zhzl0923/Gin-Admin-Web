import { Layout } from "antd";
import Left from "./Left";
import PropTypes from "prop-types";
import { HeaderRight } from "@/containers/HeaderRight";
const { Header } = Layout;

const Navbar = ({ collapsed, toggle }) => {
  return (
    <Header className="header">
      <Left collapsed={collapsed} toggle={toggle}></Left>
      <HeaderRight />
    </Header>
  );
};

Navbar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Navbar;
