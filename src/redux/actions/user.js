export const setToken = (token) => {
  return {
    type: "SET_TOKEN",
    token,
  };
};

export const setNickname = (nickname) => {
  return {
    type: "SET_NICKNAME",
    nickname,
  };
};

export const setUserId = (userID) => {
  return {
    type: "SET_USER_ID",
    userID,
  };
};

export const setAvatar = (avatar) => {
  return {
    type: "SET_AVATAR",
    avatar,
  };
};

export const setIsSuper = (isSuper) => {
  return {
    type: "SET_IS_SUPER",
    isSuper,
  };
};

export const setUserInfo = ({ userID, nickname, avatar, isSuper }) => {
  return {
    type: "SET_USER_INFO",
    userID,
    nickname,
    avatar,
    isSuper,
  };
};
