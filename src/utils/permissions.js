export const genePermission = (menus) => {
  var permissions = [];
  for (let menu of menus) {
    if (menu.type === 2) {
      permissions.push(menu.permission);
    }
    permissions.push(...genePermission(menu.children));
  }
  return permissions;
};
