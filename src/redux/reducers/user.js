const initialState = {
  token: localStorage.getItem("token"),
  userID: 0,
  nickname: "",
  avatar: "",
  isSuper: 0,
};

const setToken = (state, token) => {
  localStorage.setItem("token", token);
  return {
    ...state,
    token: token,
  };
};

const User = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return setToken(state, action.token);
    case "SET_USER_INFO":
      return {
        ...state,
        userID: action.userID,
        nickname: action.nickname,
        avatar: action.avatar,
        isSuper: action.isSuper,
      };
    case "SET_NICKNAME":
      return { ...state, nickname: action.nickanme };
    case "SET_USER_ID":
      return { ...state, userID: action.userID };
    case "SET_AVATAR":
      return { ...state, avatar: action.avatar };
    case "SET_IS_SUPER":
      return { ...state, isSuper: action.isSuper };
    default:
      return state;
  }
};

export default User;
