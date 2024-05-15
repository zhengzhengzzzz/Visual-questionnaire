import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import {
  EditParagraphDefaultProps,
  EditParagraphPropsType,
} from "./interface";
import { Typography } from "antd";

const { Paragraph } = Typography;

const EditParagraph: FC<EditParagraphPropsType> = (
  props: EditParagraphPropsType
) => {
  const { text = "", isCenter = false } = {
    ...EditParagraphDefaultProps,
    ...props,
  };

  const textList = text.split("\n");

  return (
    <Paragraph
      style={{ textAlign: isCenter ? "center" : "start", marginBottom: 0 }}
    >
      {textList.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />} {t}
        </span>
      ))}
    </Paragraph>
  );
};
export default memo(EditParagraph);
