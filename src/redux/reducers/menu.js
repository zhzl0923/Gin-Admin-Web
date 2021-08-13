const initialState = [];

const Menus = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MENUS":
      return action.menus;
    default:
      return state;
  }
};
export default Menus;
