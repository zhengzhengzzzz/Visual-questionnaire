import React, { memo, useState } from "react";
import type { FC, ReactNode } from "react";
import { StarWrapper } from "./style";
import Title from "antd/es/typography/Title";
import { Empty, Spin } from "antd";
import QuestionCard from "../../../components/QuestionCard";
import ListSearch from "../../../components/ListSearch";
import useLoadQuestionListData from "../../../hooks/useLoadQuestionListData";
import Pagination from "../../../components/ListPage";
import ListPage from "../../../components/ListPage";

interface IProps {
  children?: ReactNode;
}

const Star: FC<IProps> = () => {
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data;
  return (
    <StarWrapper>
      <div className="header">
        <div className="left">
          <Title level={3}>星标问卷</Title>
        </div>
        <div className="right">
          <ListSearch />
        </div>
      </div>
      <div className="content">
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            return <QuestionCard key={q._id} {...q} />;
          })}
      </div>
      <div className="footer">
        <ListPage total={total} />
      </div>
    </StarWrapper>
  );
};
export default memo(Star);
