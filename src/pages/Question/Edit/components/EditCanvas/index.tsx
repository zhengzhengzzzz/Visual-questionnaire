// 画布组件
import React, { memo, MouseEvent } from "react";
import type { FC, ReactNode } from "react";
import { CanvasWrapper } from "./style";

import { Spin } from "antd";
import useGetComponentInfo from "../../../../../hooks/useGetComponentInfo";
import {
  changeSelectedId,
  componentInfoType,
  moveComponent,
} from "../../../../../store/modules/Edit/component";
import { getComponentConfByType } from "../../../../../components/QuestionComponents";
import { useAppDispatch } from "../../../../../store";
import classNames from "classnames";
import useBindCanvasKeyPress from "../../../../../hooks/useBindCanvasKeyPress";
import SortableContainer from "../../../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../../../components/DragSortable/SortableItem";

interface IProps {
  children?: ReactNode;
  // 传进来loading的值 页面加载
  loading: boolean;
}

function genComponent(componentInfo: componentInfoType) {
  const { type, props } = componentInfo;

  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;

  const { Component } = componentConf;
  return <Component {...props} />;
}

const EditCanvas: FC<IProps> = (props) => {
  const { loading } = props;
  const { componentList, selectedId } = useGetComponentInfo();

  const dispatch = useAppDispatch();

  // 点击组件 选中组件id
  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation(); //阻止冒泡 防止冒泡到上层 取消组件的选中 因为最外层有点击取消选中组件
    dispatch(changeSelectedId(id));
  }

  // 监听快捷键
  useBindCanvasKeyPress();

  // 页面加载中
  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );

  // SortableContainer组件的items属性 需要每个item都有id
  const componentListWithId = componentList.map((c) => {
    return { ...c, id: c.fe_id };
  });

  // 拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }));
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <CanvasWrapper>
        {componentList &&
          componentList
            .filter((c) => !c.isHidden)
            // 遍历组件列表
            .map((c, index) => {
              const { fe_id, isLocked } = c;
              return (
                <SortableItem key={index} id={fe_id}>
                  <div
                    //拼接class name 组件选中样式
                    className={classNames({
                      ["component-wrapper"]: true,
                      ["selected"]: fe_id === selectedId,
                      ["locked"]: isLocked,
                    })}
                    onClick={(e) => {
                      handleClick(e, fe_id); //点击选中组件id
                    }}
                  >
                    <div className="component">{genComponent(c)}</div>
                  </div>
                </SortableItem>
              );
            })}
      </CanvasWrapper>
    </SortableContainer>
  );
};
export default memo(EditCanvas);
