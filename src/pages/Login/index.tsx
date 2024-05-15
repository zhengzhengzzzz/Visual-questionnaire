import React, { memo, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { LoginWrapper } from "./style";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Space,
  Typography,
  message,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATNAME,
  REGISTER_PATHNAME,
} from "../../router";
import { useRequest } from "ahooks";
import { loginService } from "../../services/user";
import { setToken } from "../../utils/user-token";
import { useAppDispatch } from "../../store";
import { loginReducer } from "../../store/modules/user";

interface IProps {
  children?: ReactNode;
}

const { Title } = Typography;

const USERNAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}

function deleteUserFormStorage() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}

function getUserInfoFormStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
}

const Login: FC<IProps> = () => {
  const [form] = Form.useForm(); //第三方hook

  const nav = useNavigate();

  useEffect(() => {
    const { username, password } = getUserInfoFormStorage();
    form.setFieldsValue({ username, password });
  }, []);

  // 登录
  const { run } = useRequest(
    async (username: string, password: string) =>
      await loginService(username, password),
    {
      manual: true,
      onSuccess(result) {
        const { token = "" } = result.data.data;
        console.log(result);
        setToken(token);
        message.success("登录成功");
        nav(MANAGE_INDEX_PATNAME);
      },
    }
  );

  const onFinish = (values: any) => {
    const { username, password, remember } = values;
    run(username, password);
    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserFormStorage();
    }
  };
  return (
    <LoginWrapper>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: "请输入用户名" },
              { type: "string", min: 5, max: 20, message: "长度在 5-20 之间" },
              { pattern: /^\w+$/, message: "只能是字母数字下划线" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </LoginWrapper>
  );
};
export default memo(Login);
