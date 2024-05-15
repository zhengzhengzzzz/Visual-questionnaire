// 头部组件
import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { HeaderWrapper } from "./style";
import { Button, Space, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import EditToolbar from "./EditToolbar";
import HeadTitle from "./HeadTitle";
import SaveBtn from "./SaveBtn";
import PublishBtn from "./PublishBtn";

interface IProps {
  children?: ReactNode;
}

const { Title } = Typography;

const EditHeader: FC<IProps> = () => {
  const nav = useNavigate();

  return (
    <HeaderWrapper>
      <div className="header">
        <div className="left">
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <HeadTitle />
          </Space>
        </div>
        <div className="main">
          <EditToolbar />
        </div>
        <div className="right">
          <Space>
            <SaveBtn />
            <PublishBtn />
          </Space>
        </div>
      </div>
    </HeaderWrapper>
  );
};
export default memo(EditHeader);
