import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { LogoWrapper } from "./style";
import { Link } from "react-router-dom";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import { HOME_PATHNAME, MANAGE_INDEX_PATNAME } from "../../router";

interface IProps {
  children?: ReactNode;
}

const { Title } = Typography;

const Logo: FC<IProps> = () => {
  const { username, nickname } = useGetUserInfo();

  const [pathname, setPathname] = useState(HOME_PATHNAME);

  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATNAME);
    }
  }, [username]);

  return (
    <LogoWrapper>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>视觉问卷</Title>
        </Space>
      </Link>
    </LogoWrapper>
  );
};
export default memo(Logo);
