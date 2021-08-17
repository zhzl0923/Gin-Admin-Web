import { connect } from "react-redux";
import Menu from "@/layouts/Sidebar/Menu";

const mapStateToProps = (state) => {
  return {
    Routers: state.Routers,
  };
};

export const MenuContainer = connect(mapStateToProps)(Menu);
