const initialState = {
  collapsed: false,
};

const App = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_SIDER":
      return {
        ...state,
        collapsed: !action.collapsed,
      };
    default:
      return state;
  }
};
export default App;
