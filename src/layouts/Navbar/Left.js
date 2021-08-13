import Breadcrumb from "./Breadcrumb";
import Icon from "@/components/Icon";

const Left = ({ collapsed, toggle }) => {
  return (
    <div className="header-left">
      <span className="trigger" onClick={() => toggle(collapsed)}>
        <Icon type={collapsed ? "MenuUnfoldOutlined" : "MenuFoldOutlined"} />
      </span>
      <Breadcrumb />
    </div>
  );
};

export default Left;
