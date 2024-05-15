import { Typography } from "antd";
import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { EditTitlePropsType, EditTitleDefaultProps } from "./interface";

// 从antd里面引入title
const { Title } = Typography;

const EditTitle: FC<EditTitlePropsType> = (props: EditTitlePropsType) => {
  const {
    text = "一行标题",
    level = 1,
    isCenter = false,
  } = { ...EditTitleDefaultProps, ...props }; //如果传入props则会覆盖默认属性

  // 根据level不同的值 字体大小
  const genFontSize = (level: number) => {
    if (level === 1) return "24px";
    if (level === 2) return "20px";
    if (level === 3) return "16px";
    return "16px";
  };
  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? "center" : "start",
        marginBottom: 0,
        fontSize: genFontSize(level),
      }}
    >
      {text}
    </Title>
  );
};
export default memo(EditTitle);
