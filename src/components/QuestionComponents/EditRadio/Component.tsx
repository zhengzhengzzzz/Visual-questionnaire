import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { EditRadioDefaultProps, EditRadioPropsType } from "./interface";
import { Radio, Space, Typography } from "antd";

const { Paragraph } = Typography;

const EditRadio: FC<EditRadioPropsType> = (props: EditRadioPropsType) => {
  const {
    title,
    options = [],
    value,
    isVertical,
  } = { ...EditRadioDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? "vertical" : "horizontal"}>
          {options?.map((opt, index) => {
            const { text, value } = opt;
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};
export default memo(EditRadio);
