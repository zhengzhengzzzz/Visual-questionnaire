import React, { memo, useEffect, useMemo, useRef } from "react";
import type { FC, ReactNode } from "react";
import { useState } from "react";
import QuestionCard from "../../../components/QuestionCard";
import { ListWrapper } from "./style";
import { useSearchParams } from "react-router-dom";
import { useDebounceFn, useRequest, useTitle, useThrottleFn } from "ahooks";
import { Empty, Spin, Typography } from "antd";
import ListSearch from "../../../components/ListSearch";
import { getQuestionListService } from "../../../services/question";
import useLoadQuestionListData from "../../../hooks/useLoadQuestionListData";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../../constant";
import { nanoid } from "nanoid";

interface IProps {
  children?: ReactNode;
}

const { Title } = Typography;

const List: FC<IProps> = () => {
  useTitle("视觉问卷-我的问卷");

  const [started, setStarted] = useState(false); //是否已经开始加载 防抖  有延迟时间

  const [page, setPage] = useState(1);
  const [list, setList] = useState([]); //累计的
  const [total, setTotal] = useState(0);
  const [searchParams] = useSearchParams();
  const haveMoreData = total > list.length;
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

  // keyword 变化时 重置信息
  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);

  // 真正加载
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService(nanoid(), {
        page,
        pageSize: LIST_PAGE_SIZE,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result;
        setList(list.concat(l));
        setTotal(total);
        setPage(page + 1);
      },
    }
  );
  
  // 尝试去触发加载 节流
  const containerRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useThrottleFn(
    () => {
      const elem = containerRef.current;
      if (elem === null) return;
      // 通过调用getBoundingClientRect()方法获取到DOM元素的位置信息，返回一个DOMRect对象，包含了该元素的位置、大小等信息。
      const domRect = elem.getBoundingClientRect();
      if (domRect == null) return;
      // 从DOMRect对象中提取出底部坐标信息。
      const { bottom } = domRect;
      // 判断元素底部距离页面顶部的距离是否小于等于当前视口的高度（即元素是否已经进入可视区域）。
      if (bottom <= document.body.clientHeight) {
        load(); //真正加载数据
        setStarted(true);
      }
    },
    {
      wait: 1000,
    }
  );

  // 1.当页面加载，或者 url 参数 (keyword) 发生变化 触发加载
  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);

  // 2.当页面滚动时 尝试触发加载
  useEffect(() => {
    window.addEventListener("scroll", tryLoadMore);

    return () => {
      window.removeEventListener("scroll", tryLoadMore); //解绑事件！！！
    };
  }, [searchParams, haveMoreData]);

  // 渲染可见部分的列表项
  const visibleList = useMemo(() => {
    let startIndex = list.length - LIST_PAGE_SIZE;
    let endIndex = list.length;
    return list.slice(startIndex, endIndex);
  }, [list, , total]);

  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveMoreData) return <span>没有更多了...</span>;
    return <span>开始加载下一页</span>;
  }, [started, loading, haveMoreData]);

  return (
    <ListWrapper>
      <div className="header">
        <div className="left">
          <Title level={3}>我的问卷</Title>
        </div>
        <div className="right">
          <ListSearch />
        </div>
      </div>
      <div className="content">
        {/* 问卷列表 */}
        {visibleList.length > 0 &&
          visibleList.map((q: any) => {
            return <QuestionCard key={q._id} {...q} />;
          })}
      </div>
      <div className="footer" ref={containerRef}>
        {LoadMoreContentElem}
      </div>
    </ListWrapper>
  );
};
export default memo(List);
