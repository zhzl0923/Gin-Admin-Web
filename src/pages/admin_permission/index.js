import { useState, useCallback, useEffect } from "react";
import { Row, Col, Table, Space, Button, message } from "antd";
import {
  getAdminPermissionList,
  deleteAdminPermissionById,
} from "@/api/admin_permission";
import Columns from "./Columns";
import Create from "./Create";
import Edit from "./Edit";
import Permission from "@/components/permission";

const AdminPermission = () => {
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
  const getPermissionList = (page = 1, pageSize = 10) => {
    getAdminPermissionList(page, pageSize).then((res) => {
      setData(res.items);
      setPage(res.page);
      setPageSize(res.page_size);
      setTotal(res.total);
    });
  };
  const getList = useCallback(getPermissionList, [
    setData,
    setPage,
    setPageSize,
    setTotal,
  ]);

  useEffect(() => {
    getList();
  }, [getList]);

  const onChange = (pagination) => {
    getPermissionList(pagination.current, pagination.pageSize);
  };
  const finish = () => {
    getPermissionList(page, pageSize);
  };

  const edit = (id) => {
    setId(id);
    setEditVisible(true);
  };
  const del = (id) => {
    deleteAdminPermissionById(id)
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
        <Permission permission="setting.permission.add">
          <Col span={24}>
            <Space className="w-full" align="end">
              <Button type="primary" onClick={showModal}>
                新增
              </Button>
            </Space>
          </Col>
        </Permission>
        <Permission permission="setting.permission.view">
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
      <Permission permission="setting.permission.add">
        <Create
          visible={createVisible}
          setVisible={setCreateVisible}
          finish={finish}
        />
      </Permission>
      <Permission permission="setting.permission.edit">
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

export default AdminPermission;
