import { Form, Input, Modal, message } from "antd";
import { useEffect } from "react";
import {
  getAdminPermissionById,
  updateAdminPermission,
} from "@/api/admin_permission";

const Edit = ({ id, visible, setVisible, finish }) => {
  const [form] = Form.useForm();

  const onOk = () => {
    form.submit();
  };
  const onFinish = (values) => {
    updateAdminPermission(id, values)
      .then((res) => {
        message.success("修改成功", 1, () => {
          setVisible(false);
          finish();
        });
      })
      .catch((err) => {});
  };
  useEffect(() => {
    if (id) {
      getAdminPermissionById(id).then((res) => {
        form.setFieldsValue({
          name: res.name,
          http_path: res.http_path,
          http_method: res.http_method,
        });
      });
    }
  }, [form, id]);
  return (
    <Modal
      centered
      title="编辑管理员"
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
        <Form.Item
          label="权限名称"
          name="name"
          rules={[{ required: true, message: "请输入权限名称!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="请求路径"
          name="http_path"
          rules={[{ required: true, message: "请输入请求路径!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="请求方法"
          name="http_method"
          rules={[{ required: true, message: "请输入请求方法!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Edit;
