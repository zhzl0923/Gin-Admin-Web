import { useState } from "react";
import { Upload as AntUpload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import UploadFile from "@/api/upload";

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("只能上传JPG、PNG文件!");
  }
  const isLt2M = file.size / 1024 / 1024 < 20;
  if (!isLt2M) {
    message.error("文件大小必须小于2MB!");
  }
  return isJpgOrPng && isLt2M;
}
const Upload = ({ fileUploadPath, setFileUploadPath }) => {
  const [loading, setLoading] = useState(false);

  const uploadFile = (options) => {
    let params = new FormData(); //创建form对象
    params.append("file", options.file);
    params.append("type", 1);
    UploadFile(params)
      .then((res) => {
        setLoading(false);
        setFileUploadPath(res.path);
      })
      .catch((err) => {});
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传文件</div>
    </div>
  );

  return (
    <AntUpload
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      customRequest={uploadFile}
    >
      {fileUploadPath ? (
        <img
          src={process.env.REACT_APP_STATIC_FILE_URL + fileUploadPath}
          alt="avatar"
          style={{ width: "100%" }}
        />
      ) : (
        uploadButton
      )}
    </AntUpload>
  );
};

export default Upload;
