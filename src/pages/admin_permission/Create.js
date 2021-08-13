import { Form, Input, Modal, message } from "antd";
import { createAdminPermission } from "@/api/admin_permission";

const Create = ({ visible, setVisible, finish }) => {
  const [form] = Form.useForm();
  const onOk = () => {
    form.submit();
  };
  const onFinish = (values) => {
    createAdminPermission(values)
      .then(() => {
        message.success("添加成功", 1, () => {
          form.resetFields();
          setVisible(false);
          finish();
        });
      })
      .catch((err) => {
        message.success(err.response.data.msg, 1);
      });
  };
  return (
    <Modal
      centered
      title="添加权限"
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

export default Create;
