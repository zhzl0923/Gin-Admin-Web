import { Form, Input, Radio, Modal, message, Select } from "antd";
import Upload from "@/components/Upload";
import { useState, useEffect } from "react";
import { createAdminUser } from "@/api/admin_user";
import { getAdminRoleList } from "@/api/admin_role";

const Create = ({ visible, setVisible, finish }) => {
  const [form] = Form.useForm();
  const [fileUploadPath, setFileUploadPath] = useState("");
  const [roleOptions, setRoleOptions] = useState([]);
  const onOk = () => {
    form.submit();
  };
  const onFinish = (values) => {
    values.avatar = fileUploadPath;
    createAdminUser(values)
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
  useEffect(() => {
    getAdminRoleList().then((res) => {
      let options = [];
      for (let role of res) {
        options.push({ label: role.role_name, value: role.id });
      }
      setRoleOptions(options);
    });
  }, [setRoleOptions]);
  return (
    <Modal
      centered
      title="添加管理员"
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
          label="用户名"
          name="username"
          rules={[
            { required: true, message: "请输入用户名!" },
            { min: 5, message: "用户名不少于5位" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            { required: true, message: "请输入密码!" },
            { min: 6, message: "密码不少于6位" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "请确认密码",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次输入密码不一致"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="昵称"
          name="nickname"
          rules={[{ required: true, message: "请输入昵称!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="超级管理员" name="is_super" initialValue={0}>
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="avatar" label="头像">
          <Upload
            fileUploadPath={fileUploadPath}
            setFileUploadPath={setFileUploadPath}
          />
        </Form.Item>
        <Form.Item label="角色" name="role_id" initialValue="">
          <Select
            placeholder="请选择角色"
            allowClear
            showSearch
            value
            options={roleOptions}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Create;
