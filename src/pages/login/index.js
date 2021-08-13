import { Card } from "antd";
import LoginForm from "./LoginForm";
import LoginFormImg from "@/assets/img/login-form.png";
const Login = () => {
  return (
    <div className="login">
      <div>
        <div className="text-3xl text-center text-gray-1">后台管理系统</div>
        <div className="mt-2 text-base text-center text-gray-1">
          Go React Admin
        </div>
      </div>
      <div className="mt-12">
        <Card>
          <div className="flex w-auto">
            <div className="w-auto h-auto mt-8 mb-8 mr-2">
              <img className="w-auto h-80" src={LoginFormImg} alt="" />
            </div>
            <div className="flex items-center w-auto h-auto mr-4">
              <LoginForm></LoginForm>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
