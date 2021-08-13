import httpRequest from "@/utils/request";
const UploadFile = (data) => {
  return httpRequest({
    url: "/admin/v1/upload/file",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data,
  });
};

export default UploadFile;
