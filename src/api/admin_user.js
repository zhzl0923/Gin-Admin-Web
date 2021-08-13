import httpRequest from "@/utils/request";
export const getAdminUserByToken = () => {
  return httpRequest({
    url: "/admin/v1/administor/info",
    method: "get",
  });
};

export const getAdminUserList = (page = 1, pageSize = 10) => {
  return httpRequest({
    url: "/admin/v1/administor",
    method: "get",
    params: { page: page, page_size: pageSize },
  });
};

export const createAdminUser = (data) => {
  return httpRequest({
    url: "/admin/v1/administor",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
};

export const getAdminUserById = (id) => {
  return httpRequest({
    url: "/admin/v1/administor/" + id,
    method: "get",
  });
};

export const updateAdminUser = (id, data) => {
  return httpRequest({
    url: "/admin/v1/administor/" + id,
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
};

export const deleteAdminUserById = (id) => {
  return httpRequest({
    url: "/admin/v1/administor/" + id,
    method: "delete",
  });
};
