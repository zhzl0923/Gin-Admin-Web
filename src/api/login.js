import httpRequest from "@/utils/request";

export const getCaptcha = () => {
  return httpRequest({
    url: "/admin/v1/captcha",
    method: "get",
  });
};

export const login = (data) => {
  return httpRequest({
    url: "/admin/v1/login",
    method: "post",
    data: data,
  });
};
