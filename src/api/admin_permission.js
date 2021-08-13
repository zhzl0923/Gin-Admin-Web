import httpRequest from "@/utils/request";

export const getAllAdminPermission = () => {
  return httpRequest({
    url: "/admin/v1/permission/all",
    method: "get",
  });
};

export const getAdminPermissionList = (page = 1, pageSize = 10) => {
  return httpRequest({
    url: "/admin/v1/permission",
    method: "get",
    params: { page: page, page_size: pageSize },
  });
};

export const createAdminPermission = (data) => {
  return httpRequest({
    url: "/admin/v1/permission",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
};

export const getAdminPermissionById = (id) => {
  return httpRequest({
    url: "/admin/v1/permission/" + id,
    method: "get",
  });
};

export const updateAdminPermission = (id, data) => {
  return httpRequest({
    url: "/admin/v1/permission/" + id,
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
};

export const deleteAdminPermissionById = (id) => {
  return httpRequest({
    url: "/admin/v1/permission/" + id,
    method: "delete",
  });
};
