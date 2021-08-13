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
    title: "权限名称",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "请求路径",
    dataIndex: "http_path",
    key: "nickname",
    align: "center",
  },
  {
    title: "请求方法",
    dataIndex: "http_method",
    key: "http_method",
    align: "center",
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
          <Permission permission="setting.permission.edit">
            <Col>
              <button onClick={() => edit(record.id)} className="text-blue-6">
                <Icon type="FormOutlined" />
              </button>
            </Col>
          </Permission>
          <Permission permission="setting.permission.del">
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
