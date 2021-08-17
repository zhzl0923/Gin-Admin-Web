import { connect } from "react-redux";
import { setToken, setUserInfo } from "@/redux/actions/user";
import { setMenus } from "@/redux/actions/menu";
import { setPermissions } from "@/redux/actions/permission";
import { setRouter } from "@/redux/actions/router";
import Auth from "@/components/Auth";

const mapStateToProps = (state) => {
  return {
    user: {
      userID: state.User.userID,
      token: state.User.token,
    },
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updToken: (token) => {
      dispatch(setToken(token));
    },
    updUserInfo: (userInfo) => {
      dispatch(setUserInfo(userInfo));
    },
    setUserMenus: (menus) => {
      dispatch(setMenus(menus));
    },
    setUserPermissions: (permissions) => {
      dispatch(setPermissions(permissions));
    },
    setUserRouters: (routers) => {
      dispatch(setRouter(routers));
    },
  };
};

export const Authorization = connect(mapStateToProps, mapDispatchToProps)(Auth);
