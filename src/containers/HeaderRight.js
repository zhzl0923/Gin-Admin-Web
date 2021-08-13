import { connect } from "react-redux";
import { setToken } from "@/redux/actions/user";
import Right from "@/layouts/Navbar/Right";

const mapStateToProps = (state) => {
  return {
    userInfo: {
      nickname: state.User.nickname,
      avatar: state.User.avatar,
    },
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => {
      dispatch(setToken(token));
    },
  };
};

export const HeaderRight = connect(mapStateToProps, mapDispatchToProps)(Right);
