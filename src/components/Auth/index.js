import { useEffect, useCallback } from "react";
import { getAdminUserByToken } from "@/api/admin_user";
import { useHistory } from "react-router";
import { getAdminMenuByUserId } from "@/api/admin_menu";
import { geneRouter } from "@/utils/router";
import { genePermission } from "@/utils/permissions";
import PropTypes from "prop-types";

const Auth = ({
  user,
  updUserInfo,
  updToken,
  setUserMenus,
  setUserPermissions,
  setUserRouters,
  children,
}) => {
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
      getAdminMenuByUserId().then((menus) => {
        setUserMenus(menus);
        setUserPermissions(genePermission(menus));
        setUserRouters(geneRouter(menus));
      });
    }
  }, [
    user.token,
    user.userID,
    updToken,
    history,
    updUserInfo,
    setUserMenus,
    setUserPermissions,
    setUserRouters,
  ]);

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
  setUserMenus: PropTypes.func.isRequired,
  setUserPermissions: PropTypes.func.isRequired,
  setUserRouters: PropTypes.func.isRequired,
};

export default Auth;
