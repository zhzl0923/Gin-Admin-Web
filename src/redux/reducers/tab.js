const initialState = [
  {
    key: "/",
    title: "首页",
    component: () => import("@/pages/dashboard"),
    closable: false,
  },
];

const addTab = (state, tab) => {
  if (state.find((t) => t.key === tab.key)) {
    return state;
  }
  return state.concat(tab);
};

const removeTab = (state, tabKey) => {
  return state.filter((t) => t.key !== tabKey);
};

const removeOthersTab = (state, tabKey) => {
  return state.filter((t) => t.key === tabKey || t.key === "/");
};

const removeAllTab = (state) => {
  return state.filter((t) => t.key === "/");
};

const Tabs = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TAB":
      return addTab(state, action.tab);
    case "REMOVE_TAB":
      return removeTab(state, action.tabKey);
    case "REMOVE_OTHERS_TAB":
      return removeOthersTab(state, action.tabKey);
    case "REMOVE_ALL_TAB":
      return removeAllTab();
    default:
      return state;
  }
};

export default Tabs;
