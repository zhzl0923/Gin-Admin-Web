import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./components/Loading";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";

const DefaultLayout = lazy(() => import("@/layouts"));
const Login = lazy(() => import("@/pages/login"));
const App = () => {
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
