import { useEffect, useCallback } from "react";
import { getAdminUserByToken } from "@/api/admin_user";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

const Auth = ({ user, updUserInfo, updToken, children }) => {
  const history = useHistory();
  const setUser = useCallback(() => {
    if (!user.token) {
      updToken("");
      history.push("/login");
      return;
    }
    if (!user.userID) {
      getAdminUserByToken()
        .then((res) => {
          updUserInfo({
            userID: res.id,
            nickname: res.nickname,
            avatar: res.avatar,
            isSuper: res.is_super,
          });
        })
        .catch(() => {
          updToken("");
          history.push("/login");
        });
    }
  }, [user, updToken, updUserInfo, history]);

  useEffect(() => {
    setUser();
  }, [setUser]);
  return <>{children}</>;
};

Auth.prototype = {
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    userID: PropTypes.number.isRequired,
  }),
  updUserInfo: PropTypes.func.isRequired,
  updToken: PropTypes.func.isRequired,
};

export default Auth;
