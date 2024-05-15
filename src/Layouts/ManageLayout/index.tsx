import React, { memo, useState } from "react";
import type { FC, ReactNode } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ManageLayoutWrapper } from "./style";
import { Button, Divider, Space, message } from "antd";
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { createQuestionService } from "../../services/question";

interface IProps {
  children?: ReactNode;
}
const ManageLayout: FC<IProps> = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const [loading, setLoading] = useState(false);

  async function handleCreateClick() {
    setLoading(true);

    const data = await createQuestionService();
    const { id } = data || {};
    if (id) {
      nav(`/question/edit/${id}`);
      message.success("创建成功");
    }

    setLoading(false);
  }

  return (
    <ManageLayoutWrapper>
      <div className="left">
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleCreateClick}
            disabled={loading}
          >
            新建问卷
          </Button>
          <Divider />
          <Button
            type={pathname.startsWith("/manage/list") ? "default" : "text"}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => {
              nav("/manage/list");
            }}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/star") ? "default" : "text"}
            size="large"
            icon={<StarOutlined />}
            onClick={() => {
              nav("/manage/star");
            }}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/trash") ? "default" : "text"}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => {
              nav("/manage/trash");
            }}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className="right">
        <Outlet />
      </div>
    </ManageLayoutWrapper>
  );
};
export default memo(ManageLayout);
