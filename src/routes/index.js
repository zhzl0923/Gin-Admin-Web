export const constantRoutes = () => {
  return [
    {
      path: "/",
      component: () => import("@/pages/dashboard"),
      title: "首页",
      exact: true,
      meta: { icon: "HomeOutlined" },
    },
  ];
};

// const asyncRoutes = [
//   {
//     path: "/admin",
//     title: "系统管理",
//     exact: true,
//     meta: { icon: "SettingOutlined" },
//     routes: [
//       {
//         path: "/account",
//         component: () => import("pages/admin_user"),
//         title: "账号管理",
//       },
//       {
//         path: "/role",
//         component: () => import("pages/admin_role"),
//         title: "角色管理",
//       },
//       {
//         path: "/menu",
//         component: () => import("pages/admin_menu"),
//         title: "菜单管理",
//       },
//       {
//         path: "/permission",
//         component: () => import("pages/admin_permission"),
//         title: "权限管理",
//       },
//     ],
//   },
// ];

const asyncRoutes = () => {
  return [];
};

const Routes = [...constantRoutes(), ...asyncRoutes()];

export default Routes;
