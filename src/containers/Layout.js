import { connect } from "react-redux";
import { toggleSider } from "@/redux/actions/app";
import Navbar from "@/layouts/Navbar";
import Sidebar from "@/layouts/Sidebar";

const mapStateToProps = (state) => {
  return {
    collapsed: state.App.collapsed,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggle: (collapsed) => {
      dispatch(toggleSider(collapsed));
    },
  };
};

export const CollapseNavbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

export const CollapseSidebar = connect(mapStateToProps)(Sidebar);
