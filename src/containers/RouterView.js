import { connect } from "react-redux";
import RouteView from "@/layouts/RouteView";

const mapStateToProps = (state) => {
  return {
    Routers: state.Routers,
  };
};

export const RouteViewContainer = connect(mapStateToProps)(RouteView);
