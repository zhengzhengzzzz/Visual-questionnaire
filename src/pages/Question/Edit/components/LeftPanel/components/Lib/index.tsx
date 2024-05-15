// 左侧面板组件库
import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import {
  ComponentConfType,
  componentConfGroup,
} from "../../../../../../../components/QuestionComponents";
import { Typography } from "antd";
import { Wrapper } from "./style";
import { useAppDispatch } from "../../../../../../../store";
import { addComponent } from "../../../../../../../store/modules/Edit/component";
import { nanoid } from "nanoid";

interface IProps {
  children?: ReactNode;
}

const { Title } = Typography;

// 展示组件分组函数
function GenComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c;
  const dispatch = useAppDispatch();

  // 点击组件库组件添加到画布
  function handleClick() {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    );
  }
  return (
    <Wrapper key={type} onClick={handleClick}>
      <div className="component">
        <Component />
      </div>
    </Wrapper>
  );
}

const Lib: FC<IProps> = () => {
  return (
    <>
      {/* 循环展示组件分组 */}
      {componentConfGroup.map((group, index) => {
        const { components } = group;
        return (
          <div key={index}>
            <Title
              level={3}
              style={{ fontSize: "16px", marginTop: index > 0 ? "16px" : "0" }}
            >
              {group.groupName}
            </Title>
            {/* 循环组件分组 显示 */}
            <div>
              {components.map((c) => {
                return GenComponent(c);
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
export default memo(Lib);
