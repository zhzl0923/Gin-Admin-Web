import { Form, Input, Modal, message, Tree, Select } from "antd";
import { useEffect, useState, useCallback } from "react";
import { getAdminRoleById, updateAdminRole } from "@/api/admin_role";
import { getAdminMenuList } from "@/api/admin_menu";
import { getAllAdminPermission } from "@/api/admin_permission";
import { getMenuTreeData, getCheckedKeys } from "@/utils/tree";

const Edit = ({ id, visible, setVisible, finish }) => {
  const [form] = Form.useForm();
  const [treeData, setTreeData] = useState([]);
  const [checkedKeys, setCheckKeys] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const onOk = () => {
    form.submit();
  };
  const onFinish = (values) => {
    updateAdminRole(id, values)
      .then((res) => {
        message.success("修改成功", 1, () => {
          setVisible(false);
          finish();
        });
      })
      .catch((err) => {});
  };

  const init = useCallback(() => {
    if (id) {
      getAdminRoleById(id).then((res) => {
        form.setFieldsValue({
          role_name: res.role_name,
          menus: res.menus,
          permissions: res.permissions,
        });
        getAdminMenuList()
          .then((resp) => {
            const data = getMenuTreeData(resp);
            setTreeData(data);
            setCheckKeys(getCheckedKeys(data, res.menus));
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
      });
    }
  }, [form, id, setTreeData, setPermissions]);

  useEffect(() => {
    init();
  }, [init]);
  const onCheck = (keys, e) => {
    setCheckKeys(keys);
    form.setFieldsValue({
      menus: keys.concat(e.halfCheckedKeys),
    });
  };
  return (
    <Modal
      checkable={true}
      centered
      title="编辑角色"
      visible={visible}
      onOk={onOk}
      onCancel={() => {
        setVisible(false);
        init();
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
          label="角色名称"
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
            checkedKeys={checkedKeys}
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

export default Edit;
