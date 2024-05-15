import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { EditInfoDefaultProps, EditInfoPropsType } from "./interface";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const EditInfo: FC<EditInfoPropsType> = (props: EditInfoPropsType) => {
  const { title, desc = "" } = { ...EditInfoDefaultProps, ...props };
  const descList = desc?.split("\n");
  return (
    <div style={{ textAlign: "center" }}>
      <Title style={{ fontSize: "24px" }}>{title}</Title>
      <Paragraph>
        {descList?.map((d, index) => {
          return (
            <span key={index}>
              {index > 0 && <br />} {d}
            </span>
          );
        })}
      </Paragraph>
    </div>
  );
};
export default memo(EditInfo);
