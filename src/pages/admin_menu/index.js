import { useState, useEffect } from "react";
import { Row, Col, Table, Space, Button, message } from "antd";
import { getAdminMenuList, deleteAdminMenuById } from "@/api/admin_menu";
import Columns from "./Columns";
import Create from "./Create";
import Edit from "./Edit";
import Permission from "@/components/permission";

const handleMenuList = function (list) {
  for (let k in list) {
    if (list[k].children && list[k].children.length === 0) {
      list[k].children = null;
      continue;
    }
    list[k].children = handleMenuList(list[k].children);
  }
  return list;
};

const AdminMenu = () => {
  const [data, setData] = useState([]);
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [id, setId] = useState(0);

  const showModal = () => {
    setCreateVisible(true);
  };
  const getMenuList = () => {
    getAdminMenuList().then((res) => {
      handleMenuList(res);
      setData(res);
    });
  };

  useEffect(() => {
    getMenuList();
  }, []);

  const finish = () => {
    getMenuList();
  };

  const edit = (id) => {
    setId(id);
    setEditVisible(true);
  };
  const del = (id) => {
    deleteAdminMenuById(id)
      .then(() => {
        message.success("删除成功", 1, () => {
          finish();
        });
      })
      .catch(() => {});
  };

  return (
    <>
      <Row gutter={[0, 24]}>
        <Permission permission="setting.menu.add">
          <Col span={24}>
            <Space className="w-full" align="end">
              <Permission permission="setting.menu.add">
                <Button type="primary" onClick={showModal}>
                  新增
                </Button>
              </Permission>
            </Space>
          </Col>
        </Permission>
        <Permission permission="setting.menu.view">
          <Col span={24}>
            <Table
              className="table-auto"
              style={{ minHeight: "95%" }}
              columns={Columns(edit, del)}
              rowKey={(record) => {
                return record.id;
              }}
              pagination={false}
              bordered
              dataSource={data}
            />
          </Col>
        </Permission>
      </Row>
      <Permission permission="setting.menu.add">
        <Create
          visible={createVisible}
          setVisible={setCreateVisible}
          finish={finish}
        />
      </Permission>
      <Permission permission="setting.menu.edit">
        <Edit
          id={id}
          visible={editVisible}
          setVisible={setEditVisible}
          finish={finish}
        />
      </Permission>
    </>
  );
};

export default AdminMenu;
