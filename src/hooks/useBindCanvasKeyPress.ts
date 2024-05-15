// 监听快捷键变化
import { useKeyPress } from "ahooks";
import { useAppDispatch } from "../store";
import {
  copySelectedComponent,
  deleteSelectedComponent,
  pasteCopiedComponent,
  selectNextComponent,
  selectPrevComponent,
} from "../store/modules/Edit/component";
import { ActionCreators } from "redux-undo";

function isActiveElementValid() {
  const activeElem = document.activeElement;
  // 没有增加 dnd-kit之前
  // if (activeElem === document.body) return true;
  // 增加了dnd-kit之后
  if (activeElem === document.body) return true;
  if (activeElem?.matches('div[role="button"]')) return true;
  return false;
}

export default function useBindCanvasKeyPress() {
  const dispatch = useAppDispatch();
  // 删除组件
  useKeyPress(["backspace", "delete"], () => {
    if (!isActiveElementValid()) return;
    dispatch(deleteSelectedComponent());
  });
  //   复制组件
  useKeyPress(["ctrl.c", "meta.c"], () => {
    if (!isActiveElementValid()) return;
    dispatch(copySelectedComponent());
  });
  // 粘贴
  useKeyPress(["ctrl.v", "meta.v"], () => {
    if (!isActiveElementValid()) return;
    dispatch(pasteCopiedComponent());
  });
  //   上一个
  useKeyPress("uparrow", () => {
    dispatch(selectPrevComponent());
  });
  //   下一个
  useKeyPress("downarrow", () => {
    dispatch(selectNextComponent());
  });

  // 撤销
  useKeyPress(
    ["ctrl.z", "meta.z"],
    () => {
      dispatch(ActionCreators.undo());
    },
    {
      exactMatch: true, //严格匹配
    }
  );

  // 重做
  useKeyPress(["ctrl.shift.z", "meta.shift.z"], () => {
    dispatch(ActionCreators.redo());
  });
}
