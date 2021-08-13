import { useEffect, useState, useCallback } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import { UserOutlined, LockOutlined, SafetyOutlined } from "@ant-design/icons";
import { getCaptcha, login } from "@/api/login";
import store from "@/redux";
import { useHistory } from "react-router";

const LoginForm = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [captchaInfo, setCaptchaInfo] = useState({
    captcha: "",
    captcha_id: "",
  });
  const [canSubmit, setCanSubmit] = useState(true);
  const [captcha, setCaptcha] = useState("");
  const onFinish = (values) => {
    values.captcha_id = captchaInfo.captcha_id;
    login(values)
      .then((res) => {
        store.dispatch({ type: "SET_TOKEN", token: res.token });
        message.success("登录成功", 1, () => {
          history.push("/");
        });
      })
      .catch((error) => {
        fetchCaptcha();
        setCanSubmit(true);
      });
  };
  const fetchCaptcha = useCallback(() => {
    //使用useCallback解决依赖函数的不可控变量
    getCaptcha().then((res) => {
      setCaptchaInfo(res);
    });
  }, [setCaptchaInfo]); //在useCallback里检查变量的改变

  useEffect(() => {
    fetchCaptcha();
  }, [fetchCaptcha]); //符合useEffect规范

  const formSubmit = () => {
    setCanSubmit(false);
    form.submit();
  };
  return (
    <Form
      className="w-full"
      name="login"
      size="large"
      onFinish={onFinish}
      form={form}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入账号!" }]}
      >
        <Input
          className="h-14 w-80"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="账号"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码!" }]}
      >
        <Input.Password
          className="h-14 w-80"
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item
        name="captcha"
        rules={[{ required: true, message: "请输入验证码" }]}
      >
        <Row className="p-0 m-0 h-14 w-80">
          <Col className="w-48">
            <Input
              value={captcha}
              onChange={(e) =>
                setCaptcha(e.target.value.replace(/[^a-z0-9]+/gi, ""))
              }
              className="h-14"
              prefix={<SafetyOutlined className="site-form-item-icon" />}
              placeholder="验证码"
            />
          </Col>
          <Col className="ml-2 w-30">
            <img
              className="w-full cursor-pointer h-14"
              src={captchaInfo.captcha}
              onClick={fetchCaptcha}
              alt=""
            />
          </Col>
        </Row>
      </Form.Item>
      <Form.Item>
        <Button
          disabled={!canSubmit}
          type="primary"
          onClick={formSubmit}
          className="w-full"
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
export default LoginForm;
