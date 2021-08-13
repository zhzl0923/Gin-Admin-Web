const initialState = [];
const Permissions = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PERMISSIONS":
      return action.permissions;
    default:
      return state;
  }
};

export default Permissions;
