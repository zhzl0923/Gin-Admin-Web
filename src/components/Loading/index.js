import { Spin } from "antd";
const Loading = () => {
  return (
    <Spin
      className="flex items-center justify-center w-screen h-screen mt-4"
      size="large"
    ></Spin>
  );
};

export default Loading;
