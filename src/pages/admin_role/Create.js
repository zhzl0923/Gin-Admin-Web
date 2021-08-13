import { Form, Input, Modal, message, Tree, Select } from "antd";
import { useEffect, useState } from "react";
import { createAdminRole } from "@/api/admin_role";
import { getAdminMenuList } from "@/api/admin_menu";
import { getAllAdminPermission } from "@/api/admin_permission";
import { getMenuTreeData } from "@/utils/tree";

const Create = ({ visible, setVisible, finish }) => {
  const [form] = Form.useForm();
  const [treeData, setTreeData] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const onOk = () => {
    form.submit();
  };
  const onFinish = (values) => {
    if (!values.menus) {
      values.menus = [];
    }
    if (!values.permissions) {
      values.permissions = [];
    }
    createAdminRole(values)
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
  const onCheck = (checkedKeys, e) => {
    form.setFieldsValue({
      menus: checkedKeys.concat(e.halfCheckedKeys),
    });
  };
  useEffect(() => {
    getAdminMenuList()
      .then((res) => {
        setTreeData(getMenuTreeData(res));
      })
      .catch();
    getAllAdminPermission()
      .then((res) => {
        const options = [];
        for (let perm of res) {
          options.push({ label: perm.name, value: perm.id });
        }
        setPermissions(options);
      })
      .catch();
  }, [setTreeData, setPermissions]);
  return (
    <Modal
      width={600}
      centered
      title="添加角色"
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
        <Form.Item
          label="角色"
          name="role_name"
          rules={[
            { required: true, message: "请输入角色名称!" },
            { min: 1, message: "请输入角色名称" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="菜单分配" name="menus">
          <Tree
            checkable
            treeData={treeData}
            height={200}
            showIcon={true}
            onCheck={onCheck}
          />
        </Form.Item>
        <Form.Item label="权限分配" name="permissions">
          <Select mode="multiple" options={permissions}></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Create;
