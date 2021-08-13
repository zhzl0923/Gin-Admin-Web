export const getTab = (path, routes) => {
  if (path === "/") {
    const currRoute = routes.find((r) => r.path === "/");
    return currRoute
      ? {
          key: currRoute.path,
          title: currRoute.title,
          component: currRoute.component,
          closable: false,
        }
      : null;
  }

  const routers = path.split("/").filter((v) => v);

  for (let route of routes) {
    if (routers.includes(route.path.substr(1))) {
      if (!route.routes) {
        return {
          key: route.path,
          title: route.title,
          component: route.component,
          closable: true,
        };
      }
      for (let r of route.routes) {
        if (routers.includes(r.path.substr(1))) {
          return {
            key: route.path + r.path,
            title: r.title,
            component: r.component,
            closable: true,
          };
        }
      }
    }
  }
  return null;
};
