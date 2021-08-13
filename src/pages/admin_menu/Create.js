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
import { getAdminMenuList, createAdminMenu } from "@/api/admin_menu";
import { useEffect, useState } from "react";
import { getMenuSelectData, getMeneSelectIcon } from "@/utils/menu";

const Create = ({ visible, setVisible, finish }) => {
  const [treeData, setTreeData] = useState([]);
  const [form] = Form.useForm();
  const options = getMeneSelectIcon();
  const onOk = () => {
    form.submit();
  };
  const onFinish = (values) => {
    createAdminMenu(values)
      .then(() => {
        message.success("添加成功", 1, () => {
          setVisible(false);
          form.resetFields();
          finish();
        });
      })
      .catch((err) => {
        message.success(err.response.data.msg, 1);
      });
  };
  useEffect(() => {
    getAdminMenuList().then((res) => {
      const list = getMenuSelectData(res);
      setTreeData([{ title: "根菜单", value: 0, children: list }]);
    });
  }, [setTreeData]);
  return (
    <Modal
      centered
      title="添加菜单"
      visible={visible}
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
        <Form.Item label="排序" name="sort" initialValue={0}>
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

export default Create;
