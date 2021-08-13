export const addTab = (tab) => {
  return {
    type: "ADD_TAB",
    tab,
  };
};

export const removeTab = (tabKey) => {
  return {
    type: "REMOVE_TAB",
    tabKey,
  };
};

export const removeOthersTab = (tabKey) => {
  return {
    type: "REMOVE_OTHERS_TAB",
    tabKey,
  };
};

export const removeAllTab = (tabKey) => {
  return {
    type: "REMOVE_ALL_TAB",
    tabKey,
  };
};
