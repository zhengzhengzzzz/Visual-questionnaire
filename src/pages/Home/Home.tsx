import { Button } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

import React, { memo, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HomeWrapper } from "./style";
import axios from "axios";

interface IProps {
  children?: ReactNode;
}
const Home: FC<IProps> = () => {
  const nav = useNavigate();

  // 前端使用mockjs
  // useEffect(() => {
  //   axios.get("/api/test").then((res) => {
  //     console.log(res.data);
  //   });
  // }, []);

  useEffect(() => {
    axios.post("/api/question").then((res) => {
      // console.log("模拟请求post", res.data);
    });
    axios.get("/api/test").then((res) => {
      console.log("问卷测是", res);
    });
  }, []);

  return (
    <HomeWrapper>
      <div className="info">
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>
          已累计创建问卷 100 份，发布问卷 90 份，收到问卷 980 份
        </Paragraph>
        <div>
          <Button type="primary" onClick={() => nav("/login")}>
            开始使用
          </Button>
        </div>
      </div>
    </HomeWrapper>
  );
};
export default memo(Home);
