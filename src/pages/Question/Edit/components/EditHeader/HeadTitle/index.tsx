import React, { memo, useState, ChangeEvent } from "react";
import type { FC, ReactNode } from "react";
import { TitleWrapper } from "./style";
import useGetPageInfo from "../../../../../../hooks/useGetPageInfo";
import { Button, Input, Space, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { changePageTitle } from "../../../../../../store/modules/Edit/pageInfo";

interface IProps {
  children?: ReactNode;
}

const { Title } = Typography;

const HeadTitle: FC<IProps> = () => {
  const { title } = useGetPageInfo();
  const [editState, SetEditState] = useState(false);
  const dispatch = useDispatch();
  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    dispatch(changePageTitle(newTitle));
  }
  if (editState) {
    return (
      <Input
        onChange={handleChangeTitle}
        value={title}
        onPressEnter={() => SetEditState(false)}
        onBlur={() => SetEditState(false)}
      />
    );
  }
  return (
    <TitleWrapper>
      <Space>
        <Title>{title}</Title>
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => SetEditState(true)}
        ></Button>
      </Space>
    </TitleWrapper>
  );
};
export default memo(HeadTitle);
