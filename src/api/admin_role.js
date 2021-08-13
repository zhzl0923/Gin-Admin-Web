import httpRequest from "@/utils/request";

export const getAdminRoleList = () => {
  return httpRequest({
    url: "/admin/v1/role",
    method: "get",
  });
};

export const createAdminRole = (data) => {
  return httpRequest({
    url: "/admin/v1/role",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
};

export const getAdminRoleById = (id) => {
  return httpRequest({
    url: "/admin/v1/role/" + id,
    method: "get",
  });
};

export const updateAdminRole = (id, data) => {
  return httpRequest({
    url: "/admin/v1/role/" + id,
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
};

export const deleteAdminRoleById = (id) => {
  return httpRequest({
    url: "/admin/v1/role/" + id,
    method: "delete",
  });
};
