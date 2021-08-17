import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Routes from "@/routes";

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

const RouteView = ({ Routers }) => {
  const Router = creatRouter([...Routes, ...Routers]);
  return (
    <Suspense fallback={false}>
      <Switch>
        {Router.map((router) => {
          return router;
        })}
      </Switch>
    </Suspense>
  );
};

export default RouteView;
