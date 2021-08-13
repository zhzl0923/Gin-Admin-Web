import {
  Form,
  Input,
  Modal,
  message,
  Radio,
  TreeSelect,
  Select,
  InputNumber,
} from "antd";
import { useEffect, useState } from "react";
import {
  getAdminMenuList,
  getAdminMenuById,
  updateAdminMenu,
} from "@/api/admin_menu";
import { getMenuSelectData, getMeneSelectIcon } from "@/utils/menu";

const Edit = ({ id, visible, setVisible, finish }) => {
  const [treeData, setTreeData] = useState([]);
  const [form] = Form.useForm();
  const options = getMeneSelectIcon();
  const onOk = () => {
    form.submit();
  };
  const onFinish = (values) => {
    updateAdminMenu(id, values)
      .then((res) => {
        message.success("修改成功", 1, () => {
          setVisible(false);
          finish();
        });
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getAdminMenuList().then((res) => {
      const list = getMenuSelectData(res);
      setTreeData([{ title: "根菜单", value: 0, children: list }]);
    });
    if (id) {
      getAdminMenuById(id).then((res) => {
        form.setFieldsValue({
          parent_id: res.parent_id,
          name: res.name,
          permission: res.permission,
          icon: res.icon,
          path: res.path,
          component: res.component,
          sort: res.sort,
          type: res.type,
          is_disabled: res.is_disabled,
        });
      });
    }
  }, [form, id]);
  return (
    <Modal
      centered
      title="编辑角色"
      visible={visible}
      destroyOnClose
      onOk={onOk}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Form
        form={form}
        name="userForm"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
      >
        <Form.Item label="父级菜单" name="parent_id" initialValue={0}>
          <TreeSelect
            showSearch
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="请选择父级菜单"
            allowClear
            treeData={treeData}
          />
        </Form.Item>
        <Form.Item
          label="名称"
          name="name"
          rules={[
            { required: true, message: "请输入菜单名称!" },
            { min: 1, message: "请输入菜单名称" },
            { max: 8, message: "菜单名称不能多余8个字符" },
          ]}
          initialValue=""
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="权限标识"
          name="permission"
          rules={[{ required: true, message: "请输入权限标识!" }]}
          initialValue=""
        >
          <Input />
        </Form.Item>
        <Form.Item label="图标" name="icon" initialValue="">
          <Select
            placeholder="请选择菜单图标"
            allowClear
            showSearch
            value
            options={options}
          />
        </Form.Item>
        <Form.Item label="路由" name="path" initialValue="">
          <Input />
        </Form.Item>
        <Form.Item label="组件" name="component" initialValue="">
          <Input />
        </Form.Item>
        <Form.Item label="排序" name="sort" initialValue="">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="类型" name="type" initialValue={1}>
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={1}>菜单</Radio.Button>
            <Radio.Button value={2}>操作</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="状态" name="is_disabled" initialValue={1}>
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={1}>启用</Radio.Button>
            <Radio.Button value={0}>禁用</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Edit;
