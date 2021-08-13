import Icon from "@/components/Icon";
import * as icons from "@ant-design/icons/lib/icons";

export const getMenuSelectData = (menuList) => {
  let treeList = [];
  for (let menu of menuList) {
    let tree = {
      title: menu.name,
      value: menu.id,
    };
    tree.children = getMenuSelectData(menu.children);
    treeList.push(tree);
  }
  return treeList;
};

export const getMeneSelectIcon = () => {
  const options = [];
  for (let i of Object.keys(icons)) {
    options.push({
      label: (
        <span className="flex items-center space-x-4">
          <Icon type={i}></Icon>
          <span>{i}</span>
        </span>
      ),
      value: i,
    });
  }
  return options;
};
