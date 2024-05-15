import { Button, Result } from "antd";
import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { MANAGE_INDEX_PATNAME } from "../../router";

interface IProps {
  children?: ReactNode;
}
const NotFound: FC<IProps> = () => {
  const nav = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，你访问的页面不存在"
      extra={
        <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATNAME)}>
          返回首页
        </Button>
      }
    ></Result>
  );
};
export default memo(NotFound);
