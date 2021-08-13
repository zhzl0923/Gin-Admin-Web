import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./components/Loading";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import store from "@/redux";
import { getAdminMenuByUserId } from "@/api/admin_menu";
import { setMenus } from "@/redux/actions/menu";
import { setRouter } from "@/redux/actions/router";
import { geneRouter } from "@/utils/router";
import { genePermission } from "@/utils/permissions";
import { setPermissions } from "@/redux/actions/permission";

const DefaultLayout = lazy(() => import("@/layouts"));
const Login = lazy(() => import("@/pages/login"));
const App = () => {
  useEffect(() => {
    getAdminMenuByUserId().then((menus) => {
      store.dispatch(setMenus(menus));
      store.dispatch(setRouter(geneRouter(menus)));
      store.dispatch(setPermissions(genePermission(menus)));
    });
  });
  return (
    <ConfigProvider locale={zhCN}>
      <Suspense fallback={<Loading />}>
        <Router>
          <Switch>
            <Route exact={true} path="/login" component={Login} />
            <Route path="/" render={() => <DefaultLayout></DefaultLayout>} />
          </Switch>
        </Router>
      </Suspense>
    </ConfigProvider>
  );
};

export default App;
