import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Routes from "@/routes";
import store from "@/redux";
import { geneRouter } from "@/utils/router";

const creatRouter = (routes) => {
  const Routers = [];
  for (let index in routes) {
    if (routes[index].component) {
      let component = lazy(routes[index].component);
      Routers.push(
        <Route
          key={index}
          path={routes[index].path}
          component={component}
          exact={routes[index].exact}
        ></Route>
      );
    }
    for (let i in routes[index].routes) {
      let component = lazy(routes[index].routes[i].component);
      Routers.push(
        <Route
          key={index + "-" + i}
          path={routes[index].path + routes[index].routes[i].path}
          component={component}
          exact={routes[index].routes[i].exact}
        ></Route>
      );
    }
  }
  return Routers;
};

const RouteView = () => {
  const { Menus } = store.getState();

  const Routers = creatRouter([...Routes, ...geneRouter(Menus)]);
  return (
    <Suspense fallback={false}>
      <Switch>
        {Routers.map((router) => {
          return router;
        })}
      </Switch>
    </Suspense>
  );
};

export default RouteView;
