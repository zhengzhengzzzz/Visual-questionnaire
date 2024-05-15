import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { EditCheckboxDefaultProps, EditCheckboxPropsType } from "./interface";
import { Checkbox, Space, Typography } from "antd";

const { Paragraph } = Typography;

const Component: FC<EditCheckboxPropsType> = (props: EditCheckboxPropsType) => {
  const {
    list = [],
    title,
    isVertical,
  } = { ...EditCheckboxDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? "vertical" : "horizontal"}>
        {list.map((opt) => {
          const { value, text, checked } = opt;
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};
export default memo(Component);
