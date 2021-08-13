import httpRequest from "@/utils/request";

export const getAdminMenuList = (page = 1, pageSize = 10) => {
  return httpRequest({
    url: "/admin/v1/menu",
    method: "get",
    params: { page: page, page_size: pageSize },
  });
};

export const createAdminMenu = (data) => {
  return httpRequest({
    url: "/admin/v1/menu",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
};

export const getAdminMenuById = (id) => {
  return httpRequest({
    url: "/admin/v1/menu/" + id,
    method: "get",
  });
};

export const updateAdminMenu = (id, data) => {
  return httpRequest({
    url: "/admin/v1/menu/" + id,
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
};

export const deleteAdminMenuById = (id) => {
  return httpRequest({
    url: "/admin/v1/menu/" + id,
    method: "delete",
  });
};

export const getAdminMenuByUserId = () => {
  return httpRequest({
    url: "/admin/v1/menu/user_menus",
    method: "get",
  });
};
