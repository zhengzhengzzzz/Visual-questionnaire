import { Input } from "antd";
import React, { memo, useState, useEffect } from "react";
import type { FC, ReactNode, ChangeEvent } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LIST_SEARCH_PARAM_KEY } from "../../constant";

interface IProps {
  children?: ReactNode;
}

const { Search } = Input;

const ListSearch: FC<IProps> = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [value, setValue] = useState("");

  // 获取url参数 并设置到input value
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
    setValue(curVal);
  }, [searchParams]);

  function handleSearch(value: string) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  return (
    <Search
      size="large"
      style={{ width: "200px" }}
      allowClear
      placeholder="请输入关键字"
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
    />
  );
};
export default memo(ListSearch);
