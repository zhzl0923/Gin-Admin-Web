import { Link, useLocation } from "react-router-dom";
import Routes from "@/routes";
import { Breadcrumb as AntdBreadcrumb, Menu } from "antd";

const generateSubRouter = (path, router) => {
  if (router.routes) {
    const r = router.routes.find((r) => r.path === "/" + path[1]);
    return (
      <AntdBreadcrumb.Item>
        <Link to={r.path}>{r.title}</Link>
      </AntdBreadcrumb.Item>
    );
  } else {
    return;
  }
};

const generateBreadcrumbMenu = (router) => {
  if (!router || !router.routes) {
    return;
  }
  return (
    <Menu>
      {router.routes.map((r, i) => {
        return (
          <Menu.Item key={router.path + r.path}>
            <Link to={router.path + r.path}>{r.title}</Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

const Breadcrumb = () => {
  const location = useLocation();
  const path = location.pathname.split("/").filter((v) => v);
  if (!path) {
    return;
  }

  const router = Routes.find((route) => {
    return (
      (path.length === 0 && route.path === "/") || route.path === "/" + path[0]
    );
  });
  if (!router) {
    return <></>;
  }
  return (
    <AntdBreadcrumb className="breadcrumb">
      <AntdBreadcrumb.Item overlay={generateBreadcrumbMenu(router)}>
        {router.component ? (
          <Link to={router.path}>{router.title}</Link>
        ) : (
          router.title
        )}
      </AntdBreadcrumb.Item>
      {generateSubRouter(path, router)}
    </AntdBreadcrumb>
  );
};

export default Breadcrumb;
