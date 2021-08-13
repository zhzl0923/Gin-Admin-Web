import { useEffect, useState } from "react";
import { Tabs as AntdTabs, Menu, Dropdown } from "antd";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";
import { getTab } from "../../utils/tabs";

const { TabPane } = AntdTabs;

const Tabs = ({ tabs, routes, callback }) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const [isReload, setIsReload] = useState(false);
  const [selectedTabKey, setSelectedTabKey] = useState("");

  useEffect(() => {
    if (pathname && pathname !== "/") {
      const tab = getTab(pathname, routes);
      if (tab) {
        callback.addTab(tab);
      }
    }
  });
  const changeTab = (activeKey) => {
    history.push(activeKey);
  };
  const removeTab = (targetKey) => {
    if (targetKey === pathname) {
      let activeKey = "/";
      for (let i in tabs) {
        if (tabs[i].key === targetKey) {
          activeKey = tabs[i - 1].key;
        }
      }
      history.push(activeKey);
    }
    callback.removeTab(targetKey);
  };

  // 阻止右键默认事件
  const preventDefault = (e, tab) => {
    e.preventDefault();
    setSelectedTabKey(tab.key);
  };

  const refreshTab = () => {
    setIsReload(true);
    setTimeout(() => {
      setIsReload(false);
    }, 1000);
  };

  const isDisabled = () => selectedTabKey === "/";
  // tab右击菜单
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => refreshTab()}
        disabled={selectedTabKey !== pathname}
      >
        刷新
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={(e) => {
          e.domEvent.stopPropagation();
          callback.removeTab(selectedTabKey);
        }}
        disabled={isDisabled()}
      >
        关闭
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={(e) => {
          e.domEvent.stopPropagation();
          callback.removeOthersTab(selectedTabKey);
        }}
      >
        关闭其他
      </Menu.Item>
      <Menu.Item
        key="4"
        onClick={(e) => {
          e.domEvent.stopPropagation();
          callback.removeAllTab();
        }}
        disabled={isDisabled()}
      >
        全部关闭
      </Menu.Item>
    </Menu>
  );

  return (
    <AntdTabs
      size="small"
      className="tabs-view-container"
      hideAdd
      activeKey={pathname}
      onEdit={removeTab}
      onChange={changeTab}
      type="editable-card"
    >
      {tabs.map((tab) => (
        <TabPane
          tab={
            <Dropdown
              overlay={menu}
              placement="bottomLeft"
              trigger={["contextMenu"]}
            >
              <span onContextMenu={(e) => preventDefault(e, tab)}>
                {isReload && tab.path === pathname && tab.path !== "/403" && (
                  <SyncOutlined title="刷新" spin={isReload} />
                )}
                {tab.title}
              </span>
            </Dropdown>
          }
          key={tab.key}
          closable={tab.closable}
        />
      ))}
    </AntdTabs>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
    })
  ).isRequired,
  callback: PropTypes.shape({
    addTab: PropTypes.func.isRequired,
    removeTab: PropTypes.func.isRequired,
  }).isRequired,
};

export default Tabs;
