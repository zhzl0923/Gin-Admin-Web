const initialState = [];
const Routers = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ROUTERS":
      return action.routers;
    default:
      return state;
  }
};

export default Routers;
