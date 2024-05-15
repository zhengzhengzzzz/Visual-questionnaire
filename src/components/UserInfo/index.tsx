import { useRequest } from "ahooks";
import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { getUserInfoService } from "../../services/user";
import { LOGIN_PATHNAME } from "../../router";
import { removeToken } from "../../utils/user-token";
import { useAppDispatch } from "../../store";
import { logoutReducer } from "../../store/modules/user";
import useGetUserInfo from "../../hooks/useGetUserInfo";

interface IProps {
  children?: ReactNode;
}
const UserInfo: FC<IProps> = () => {
  const nav = useNavigate();

  const { username, nickname } = useGetUserInfo();
  const dispatch = useAppDispatch();

  const UserInfo = (
    <>
      <span style={{ color: "#e8e8e8" }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  );
  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>;

  function logout() {
    dispatch(logoutReducer());
    removeToken(); //清除token
    message.success("退出成功");
    nav(LOGIN_PATHNAME);
  }
  return <div>{username ? UserInfo : Login}</div>;
};
export default memo(UserInfo);
