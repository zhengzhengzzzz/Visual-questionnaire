import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Spin } from "antd";
import { MainLayoutWrapper } from "./style";
import Logo from "../../components/Logo";
import UserInfo from "../../components/UserInfo";
import useLoadUserData from "../../hooks/useLoadUserData";
import useNavPage from "../../hooks/useNavPage";

const { Header, Content, Footer } = Layout;

interface IProps {
  children?: ReactNode;
}
const MainLayout: FC<IProps> = () => {
  const { waitUserData } = useLoadUserData();
  useNavPage(waitUserData);
  return (
    <MainLayoutWrapper>
      <Layout>
        <Header className="header">
          <div className="left">
            <Logo />
          </div>
          <div className="right">
            <UserInfo />
          </div>
        </Header>
        <Content className="main">
          {waitUserData ? (
            <div style={{ textAlign: "center", marginTop: "88px" }}>
              <Spin />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
        <Footer className="footer">
          视觉问卷 &copy;2023 - present. Created by 居居
        </Footer>
      </Layout>
    </MainLayoutWrapper>
  );
};
export default memo(MainLayout);
