import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import {
  EditTextareaDefaultProps,
  EditTextareaPropsType,
} from "./interface";
import { Input, Typography } from "antd";

const { Paragraph } = Typography;
const { TextArea } = Input;

const EditTextarea: FC<EditTextareaPropsType> = (
  props: EditTextareaPropsType
) => {
  const { title, placeholder } = { ...EditTextareaDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  );
};
export default memo(EditTextarea);
