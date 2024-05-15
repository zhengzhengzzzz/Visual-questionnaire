import {
  AppstoreAddOutlined,
  BarChartOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import Lib from "./components/Lib";
import Layer from "./components/Layer";

interface IProps {
  children?: ReactNode;
}
const LeftPanel: FC<IProps> = () => {
  const tabsItems = [
    {
      key: "componentLib",
      label: (
        <span>
          <AppstoreAddOutlined />
          组件库
        </span>
      ),
      children: <Lib />,
    },
    {
      key: "layers",
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: (
        <div>
          <Layer />
        </div>
      ),
    },
  ];

  return <Tabs defaultActiveKey="componentLib" items={tabsItems} />;
};
export default memo(LeftPanel);
