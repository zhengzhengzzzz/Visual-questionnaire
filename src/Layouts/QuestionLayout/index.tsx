import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import useLoadUserData from "../../hooks/useLoadUserData";
import { Spin } from "antd";
import useNavPage from "../../hooks/useNavPage";

interface IProps {
  children?: ReactNode;
}
const QuestionLayout: FC<IProps> = () => {
  const { waitUserData } = useLoadUserData();
  useNavPage(waitUserData);
  return (
    <div style={{ height: "100vh" }}>
      <div>
        {waitUserData ? (
          <div style={{ textAlign: "center", marginTop: "88px" }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};
export default memo(QuestionLayout);
