// 右侧面板
import { FileTextFilled, SettingOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import ComponentProp from "./components/componentProp";
import PageSetting from "./components/PageSetting";
import useGetComponentInfo from "../../../../../hooks/useGetComponentInfo";

// 枚举
enum TAB_KEYS {
  PROP_KEY = "prop",
  SETTING_KEY = "setting",
}

const RightPanel: FC = () => {
  const { selectedId } = useGetComponentInfo();
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY);
  useEffect(() => {
    if (selectedId) setActiveKey(TAB_KEYS.PROP_KEY);
    else setActiveKey(TAB_KEYS.SETTING_KEY);
  }, [selectedId]);
  const tabsItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextFilled />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ];
  return <Tabs activeKey={activeKey} items={tabsItems} />;
};
export default memo(RightPanel);
