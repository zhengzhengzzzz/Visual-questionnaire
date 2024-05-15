import React, { memo, useState } from "react";
import type { FC, ReactNode } from "react";
import { useLoadQuestionData } from "../../../hooks/useLoadQuestionData";
import { Button, Result, Spin } from "antd";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { useNavigate } from "react-router-dom";
import { useTitle } from "ahooks";
import { StatWrapper } from "./style";
import StatHeader from "./StatHeader";
import ComponentList from "./ComponentList";
import PageStat from "./PageStat";
import ChartStat from "./ChartStat";

interface IProps {
  children?: ReactNode;
}
const Stat: FC<IProps> = () => {
  const nav = useNavigate();
  const { loading } = useLoadQuestionData();
  const { title, isPublished } = useGetPageInfo();

  // 状态提升 selectId type
  const [selectedComponentId, setSelectedComponentId] = useState("");
  const [selectedComponentType, setSelectedComponentType] = useState("");
  // 修改标题
  useTitle(`问卷统计 - ${title}`);

  // Loading Element
  const LoadingElem = (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <Spin />
    </div>
  );

  // content Element
  function genContentElem() {
    if (typeof isPublished === "boolean" && !isPublished) {
      return (
        <div style={{ flex: 1 }}>
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          ></Result>
        </div>
      );
    }
    return (
      <>
        <div className="left">
          <ComponentList
            setSelectedComponentType={setSelectedComponentType}
            selectedComponentId={selectedComponentId}
            setselectedComponentId={setSelectedComponentId}
          />
        </div>
        <div className="main">
          <PageStat
            setSelectedComponentType={setSelectedComponentType}
            selectedComponentId={selectedComponentId}
            setselectedComponentId={setSelectedComponentId}
          />
        </div>
        <div className="right">
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    );
  }

  return (
    <StatWrapper>
      <StatHeader />
      <div className="content-wrapper">
        {loading && LoadingElem}
        <div className="content">{!loading && genContentElem()}</div>
      </div>
    </StatWrapper>
  );
};
export default memo(Stat);
