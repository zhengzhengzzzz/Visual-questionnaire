import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { useLoadQuestionData } from "../../../hooks/useLoadQuestionData";
import { EditWrapper } from "./style";
import EditCanvas from "./components/EditCanvas";
import { useAppDispatch } from "../../../store";
import { changeSelectedId } from "../../../store/modules/Edit/component";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import EditHeader from "./components/EditHeader";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { useTitle } from "ahooks";

interface IProps {
  children?: ReactNode;
}
const Edit: FC<IProps> = () => {
  const { title } = useGetPageInfo();
  useTitle(`问卷编辑 - ${title}`);
  const { loading } = useLoadQuestionData();

  const dispatch = useAppDispatch();

  // 点击其他空白地方 清空选中的组件id
  function clearSelectedId() {
    dispatch(changeSelectedId(""));
  }

  return (
    <EditWrapper>
      <EditHeader />
      <div className="content-wrapper">
        <div className="content">
          <div className="left">
            {/* 左侧面板 */}
            <LeftPanel />
          </div>
          <div className="main" onClick={clearSelectedId}>
            <div className="canvas-wrapper">
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className="right">
            <RightPanel />
          </div>
        </div>
      </div>
    </EditWrapper>
  );
};
export default memo(Edit);
