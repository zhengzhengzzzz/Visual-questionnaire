import React, { memo, useState, ChangeEvent } from "react";
import type { FC, ReactNode } from "react";
import useGetComponentInfo from "../../../../../../../hooks/useGetComponentInfo";
import { Button, Input, Space, message } from "antd";
import { useAppDispatch } from "../../../../../../../store";
import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  moveComponent,
  toggleComponentLocked,
} from "../../../../../../../store/modules/Edit/component";
import classNames from "classnames";
import { LayerWrapper } from "./style";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import SortableContainer from "../../../../../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../../../../../components/DragSortable/SortableItem";

const Layer: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useAppDispatch();
  // 记录当前正在修改标题的组件
  const [changingTitleId, setChangingTitleId] = useState("");
  //   点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentList!.find((c) => c.fe_id === fe_id);
    if (curComp && curComp.isHidden) {
      message.info("不能选中隐藏组件");
      return;
    }
    if (fe_id !== selectedId) {
      //执行选中
      dispatch(changeSelectedId(fe_id));
      setChangingTitleId("");
      return;
    }
    // 点击修改标题;
    setChangingTitleId(fe_id);
  }
  // 修改标题
  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    if (!selectedId) return;
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }));
    console.log(componentList);
  }
  //切换 隐藏显示
  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }));
  }
  // 切换 锁定解锁
  function changeLocked(fe_id: string) {
    dispatch(toggleComponentLocked({ fe_id }));
  }

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
      {componentList.map((c) => {
        const { fe_id, title, isHidden, isLocked } = c;

        // 拼接title classNames
        const titleClassName = classNames({
          ["title"]: true,
          ["selected"]: fe_id === selectedId,
        });
        return (
          <SortableItem key={fe_id} id={fe_id}>
            <LayerWrapper>
              <div
                className={titleClassName}
                onClick={() => handleTitleClick(fe_id)}
              >
                {fe_id === changingTitleId && (
                  <Input
                    onChange={changeTitle}
                    value={title}
                    onPressEnter={() => setChangingTitleId("")}
                    onBlur={() => setChangingTitleId("")}
                  />
                )}
                {fe_id !== changingTitleId && title}
              </div>
              <div className="handler">
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    className={!isHidden ? "btn" : ""}
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? "primary" : "text"}
                    onClick={() => changeHidden(fe_id, !isHidden)}
                  />
                  <Button
                    size="small"
                    shape="circle"
                    className={!isLocked ? "btn" : ""}
                    icon={<LockOutlined />}
                    type={isLocked ? "primary" : "text"}
                    onClick={() => changeLocked(fe_id)}
                  />
                </Space>
              </div>
            </LayerWrapper>
          </SortableItem>
        );
      })}
    </SortableContainer>
  );
};
export default memo(Layer);
