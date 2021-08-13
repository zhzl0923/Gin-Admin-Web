import { connect } from "react-redux";
import { setToken, setUserInfo } from "@/redux/actions/user";
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
  };
};

export const Authorization = connect(mapStateToProps, mapDispatchToProps)(Auth);
