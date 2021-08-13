export const geneRouter = (menus) => {
  var routers = [];
  for (let menu of menus) {
    if (menu.type === 2) {
      continue;
    }
    const router = {
      path: menu.path,
      component: menu.component
        ? () => import("@/pages/" + menu.component)
        : "",
      title: menu.name,
      exact: true,
      meta: { icon: menu.icon },
      routes: geneRouter(menu.children),
    };

    routers.push(router);
  }
  return routers;
};
