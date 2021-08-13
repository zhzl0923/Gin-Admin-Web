import { Layout } from "antd";
import RouteView from "./RouteView";
import { Scrollbars } from "react-custom-scrollbars";

const { Content } = Layout;
const AppMain = () => {
  return (
    <Scrollbars autoHide>
      <Content className="content">
        <RouteView></RouteView>
      </Content>
    </Scrollbars>
  );
};

export default AppMain;
