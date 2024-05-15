import { Input, Typography } from "antd";
import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { EditInputProps, EditInputDefaultProps } from "./interface";

const { Paragraph } = Typography; //文本

const EditInput: FC<EditInputProps> = (props: EditInputProps) => {
  const { title = "输入框标题", placeholder = "请输入..." } = {
    ...EditInputDefaultProps,
    ...props, //解构的时候 用传入的props覆盖默认的props
  };
  return (
    <>
      {/* 标题加粗 */}
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </>
  );
};
export default memo(EditInput);
