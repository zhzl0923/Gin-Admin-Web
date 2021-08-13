import { useState, useCallback, useEffect } from "react";
import { Row, Col, Table, Space, Button, message } from "antd";
import { getAdminUserList, deleteAdminUserById } from "@/api/admin_user";
import Columns from "./Columns";
import Create from "./Create";
import Edit from "./Edit";
import Permission from "@/components/permission";

const AdminUser = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [id, setId] = useState(0);

  const showModal = () => {
    setCreateVisible(true);
  };
  const getUserList = (page = 1, pageSize = 10) => {
    getAdminUserList(page, pageSize).then((res) => {
      setData(res.items);
      setPage(res.page);
      setPageSize(res.page_size);
      setTotal(res.total);
    });
  };
  const getList = useCallback(getUserList, [
    setData,
    setPage,
    setPageSize,
    setTotal,
  ]);

  useEffect(() => {
    getList();
  }, [getList]);

  const onChange = (pagination) => {
    getUserList(pagination.current, pagination.pageSize);
  };
  const finish = () => {
    getUserList(page, pageSize);
  };

  const edit = (id) => {
    setId(id);
    setEditVisible(true);
  };
  const del = (id) => {
    deleteAdminUserById(id)
      .then((res) => {
        message.success("删除成功", 1, () => {
          finish();
        });
      })
      .catch((err) => {});
  };

  return (
    <>
      <Row gutter={[0, 24]}>
        <Permission permission="setting.account.add">
          <Col span={24}>
            <Space className="w-full" align="end">
              <Button type="primary" onClick={showModal}>
                新增
              </Button>
            </Space>
          </Col>
        </Permission>
        <Permission permission="setting.account.view">
          <Col span={24}>
            <Table
              className="table-auto"
              style={{ minHeight: "95%" }}
              columns={Columns(edit, del)}
              rowKey={(record) => {
                return record.id;
              }}
              pagination={{
                page: page,
                total: total,
                pageSize: pageSize,
                showSizeChanger: true,
                position: ["bottomCenter"],
              }}
              bordered
              dataSource={data}
              onChange={onChange}
            />
          </Col>
        </Permission>
      </Row>
      <Permission permission="setting.account.add">
        <Create
          visible={createVisible}
          setVisible={setCreateVisible}
          finish={finish}
        />
      </Permission>
      <Permission permission="setting.account.edit">
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

export default AdminUser;
