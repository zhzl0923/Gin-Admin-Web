import { Layout } from "antd";
// import RouteView from "./RouteView";
import { Scrollbars } from "react-custom-scrollbars";
import { RouteViewContainer } from "@/containers/RouterView";

const { Content } = Layout;
const AppMain = () => {
  return (
    <Scrollbars autoHide>
      <Content className="content">
        <RouteViewContainer></RouteViewContainer>
      </Content>
    </Scrollbars>
  );
};

export default AppMain;
