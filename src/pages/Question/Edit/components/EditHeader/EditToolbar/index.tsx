import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { useAppDispatch } from "../../../../../../store";
import {
  changeComponentHidden,
  copySelectedComponent,
  deleteSelectedComponent,
  moveComponent,
  pasteCopiedComponent,
  toggleComponentLocked,
} from "../../../../../../store/modules/Edit/component";
import useGetComponentInfo from "../../../../../../hooks/useGetComponentInfo";
import { ActionCreators } from "redux-undo";

interface IProps {
  children?: ReactNode;
}
const EditToolbar: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const { selectedId, componentList, selectedComponent, copiedComponent } =
    useGetComponentInfo();
  const { isLocked } = selectedComponent || {};

  const length = componentList.length;
  const selectedIndex = componentList.findIndex((c) => c.fe_id == selectedId);
  const isFirst = selectedIndex <= 0; //第一个
  const isLast = selectedIndex + 1 >= length; //最后一个

  //   删除组件
  function handleDelete() {
    dispatch(deleteSelectedComponent());
  }
  // 隐藏组件
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
  }
  //   锁定组件
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }));
  }
  // 复制组件
  function copy() {
    dispatch(copySelectedComponent());
  }
  // 粘贴
  function paste() {
    dispatch(pasteCopiedComponent());
  }
  // 上移
  function moveUp() {
    if (isFirst) return;
    dispatch(
      moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 })
    );
  }
  // 下移
  function moveDown() {
    if (isLast) return;
    dispatch(
      moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 })
    );
  }
  // 撤销
  function undo() {
    dispatch(ActionCreators.undo());
  }
  // 重做
  function redo() {
    dispatch(ActionCreators.redo());
  }
  return (
    <Space>
      {/* 鼠标闪过显示小标题 */}
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={handleHidden}
        />
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? "primary" : "default"}
        />
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={copy} />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={paste}
          disabled={copiedComponent == null}
        />
      </Tooltip>
      <Tooltip title="上移">
        <Button
          shape="circle"
          icon={<UpOutlined />}
          onClick={moveUp}
          disabled={isFirst}
        />
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={moveDown}
          disabled={isLast}
        />
      </Tooltip>
      <Tooltip title="撤销">
        <Button shape="circle" icon={<UndoOutlined />} onClick={undo} />
      </Tooltip>
      <Tooltip title="重做">
        <Button shape="circle" icon={<RedoOutlined />} onClick={redo} />
      </Tooltip>
    </Space>
  );
};
export default memo(EditToolbar);
