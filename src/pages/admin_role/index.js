import { useState, useCallback, useEffect } from "react";
import { Row, Col, Table, Space, Button, message } from "antd";
import { getAdminRoleList, deleteAdminRoleById } from "@/api/admin_role";
import Columns from "./Columns";
import Create from "./Create";
import Edit from "./Edit";
import Permission from "@/components/permission";

const AdminRole = () => {
  const [data, setData] = useState([]);
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [id, setId] = useState(0);

  const showModal = () => {
    setCreateVisible(true);
  };
  const getRoleList = () => {
    getAdminRoleList().then((res) => {
      setData(res);
    });
  };
  const getList = useCallback(getRoleList, [setData]);

  useEffect(() => {
    getList();
  }, [getList]);

  const finish = () => {
    getRoleList();
  };

  const edit = (id) => {
    setId(id);
    setEditVisible(true);
  };
  const del = (id) => {
    deleteAdminRoleById(id)
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
        <Permission permission="setting.role.add">
          <Col span={24}>
            <Space className="w-full" align="end">
              <Button type="primary" onClick={showModal}>
                新增
              </Button>
            </Space>
          </Col>
        </Permission>
        <Permission permission="setting.role.view">
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
      <Permission permission="setting.role.add">
        <Create
          visible={createVisible}
          setVisible={setCreateVisible}
          finish={finish}
        />
      </Permission>
      <Permission permission="setting.role.edit">
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

export default AdminRole;
