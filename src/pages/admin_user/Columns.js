import { Row, Col, Popconfirm } from "antd";
import Icon from "@/components/Icon";
import Permission from "@/components/permission";

const Columns = (edit, del) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
    align: "center",
  },
  {
    title: "昵称",
    dataIndex: "nickname",
    key: "nickname",
    align: "center",
  },
  {
    title: "头像",
    dataIndex: "avatar",
    key: "avatar",
    align: "center",
    render: (text, record, index) => {
      return record.avatar ? (
        <img
          className="inline-block"
          width="40px"
          height="40px"
          src={process.env.REACT_APP_STATIC_FILE_URL + record.avatar}
          alt=""
        />
      ) : (
        ""
      );
    },
  },
  {
    title: "类型",
    dataIndex: "is_super",
    key: "is_super",
    align: "center",
    render: (is_super) => {
      return is_super === 1 ? "超级管理员" : "管理员";
    },
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    key: "created_at",
    align: "center",
  },
  {
    title: "操作",
    dataIndex: "id",
    key: "edit",
    align: "center",
    render: (text, record, index) => {
      return (
        <Row justify="center" gutter={[8, 0]}>
          <Permission permission="setting.account.edit">
            <Col>
              <button onClick={() => edit(record.id)} className="text-blue-6">
                <Icon type="FormOutlined" />
              </button>
            </Col>
          </Permission>
          <Permission permission="setting.account.del">
            <Col>
              <Popconfirm
                placement="left"
                title="确定要删除此条数据吗？"
                onConfirm={() => del(record.id)}
                okText="确认"
                cancelText="取消"
              >
                <button className="text-red-6">
                  <Icon type="DeleteOutlined" />
                </button>
              </Popconfirm>
            </Col>
          </Permission>
        </Row>
      );
    },
  },
];

export default Columns;
