import Icon from "@/components/Icon";
export const getMenuTreeData = (menuList) => {
  let treeList = [];
  for (let menu of menuList) {
    let tree = {
      title: menu.name,
      key: menu.id,
    };
    if (menu.icon) {
      tree.icon = <Icon style={{ lineHeight: "inherit" }} type={menu.icon} />;
    }
    tree.children = getMenuTreeData(menu.children);
    treeList.push(tree);
  }
  return treeList;
};

export const getCheckedKeys = (treeData, menus) => {
  let checkedKeys = [];
  for (let data of treeData) {
    if (menus.includes(data.key) && data.children.length === 0) {
      checkedKeys.push(data.key);
    }
    if (data.children.length > 0) {
      checkedKeys.push(...getCheckedKeys(data.children, menus));
    }
  }
  return checkedKeys;
};
