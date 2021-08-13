import { Avatar, Dropdown, Menu, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

const Right = ({ userInfo, setToken }) => {
  const history = useHistory();
  const logout = () => {
    Modal.confirm({
      title: "温馨提示",
      icon: <ExclamationCircleOutlined />,
      content: "确认要退出吗",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        setToken("");
        history.push("/login");
      },
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="home">
        <a rel="noopener noreferrer" href="/">
          首页
        </a>
      </Menu.Item>
      <Menu.Item key="logout" onClick={logout}>
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown className="header-right" overlay={menu}>
      <div className="flex items-center">
        <Avatar
          className="flex items-center mr-2"
          src={process.env.REACT_APP_STATIC_FILE_URL + userInfo.avatar}
        />
        <span>{userInfo.nickname ? userInfo.nickname : "     "}</span>
      </div>
    </Dropdown>
  );
};

Right.prototype = {
  userInfo: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
  }),
  setToken: PropTypes.func.isRequired,
};

export default Right;
