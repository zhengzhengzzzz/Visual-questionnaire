import React, { memo, useState, useEffect } from "react";
import { Pagination } from "antd";
import type { FC, ReactNode } from "react";
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
} from "../../constant";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface IProps {
  children?: ReactNode;
  total: number;
}
const ListPage: FC<IProps> = (props) => {
  const { total } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);

  // 从url中获取 page pageSize 参数 并且同步到pagination组件中
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
    setCurrent(page);
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
      LIST_PAGE_SIZE;
    setPageSize(pageSize);
  }, [searchParams]);

  // 当page pageSize 改变时 改变url参数
  const nav = useNavigate();
  const { pathname } = useLocation();
  function handlePageChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    nav({
      pathname,
      search: searchParams.toString(),
    });
  }

  return (
    <Pagination
      total={total}
      pageSize={pageSize}
      current={current}
      onChange={handlePageChange}
    />
  );
};
export default memo(ListPage);
