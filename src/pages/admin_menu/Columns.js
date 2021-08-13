import { Row, Col, Popconfirm, Tag } from "antd";
import Icon from "@/components/Icon";
import Permission from "@/components/permission";

const Columns = (edit, del) => [
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
    align: "left",
    width: 220,
  },
  {
    title: "权限标识",
    dataIndex: "permission",
    key: "permission",
    align: "center",
  },
  {
    title: "图标",
    dataIndex: "icon",
    key: "icon",
    align: "center",
    render: (icon) => (icon ? <Icon type={icon} /> : ""),
  },
  {
    title: "路由",
    dataIndex: "path",
    key: "path",
    align: "center",
  },
  {
    title: "组件",
    dataIndex: "component",
    key: "component",
    align: "center",
  },
  {
    title: "排序",
    dataIndex: "sort",
    key: "sort",
    align: "center",
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
    align: "center",
    render: (text, record, index) => {
      return record.type === 1 ? (
        <Tag color="#108ee9">菜单</Tag>
      ) : (
        <Tag color="#52c41a">按钮</Tag>
      );
    },
  },
  {
    title: "状态",
    dataIndex: "is_disabled",
    key: "is_disabled",
    align: "center",
    render: (text, record, index) => {
      return record.is_disabled === 1 ? (
        <Tag color="success">启用</Tag>
      ) : (
        <Tag color="error">禁用</Tag>
      );
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
          <Permission permission="setting.menu.edit">
            <Col>
              <button onClick={() => edit(record.id)} className="text-blue-6">
                <Icon type="FormOutlined" />
              </button>
            </Col>
          </Permission>
          <Permission permission="setting.menu.del">
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
