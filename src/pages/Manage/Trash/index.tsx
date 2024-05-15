import React, { memo, useState } from "react";
import type { FC, ReactNode } from "react";
import { TrashWrapper } from "./style";
import Title from "antd/es/typography/Title";
import { Button, Empty, Modal, Space, Spin, Table, Tag, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ListSearch from "../../../components/ListSearch";
import useLoadQuestionListData from "../../../hooks/useLoadQuestionListData";
import ListPage from "../../../components/ListPage";
import { useRequest } from "ahooks";
import {
  deleteQuestionsService,
  updateQuestionService,
} from "../../../services/question";

interface IProps {
  children?: ReactNode;
}

const { confirm } = Modal;

const Trash: FC<IProps> = () => {
  const {
    data = {},
    loading,
    refresh,
  } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;
  // 记录选中的复选框
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const tableColumns = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        );
      },
    },
    {
      title: "答卷",
      dataIndex: "answerCount",
    },
    {
      title: "创建时间",
      dataIndex: "createAt",
    },
  ];
  // 恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      debounceWait: 500, //防抖
      onSuccess() {
        message.success("恢复成功");
        refresh(); //手动刷新列表
      },
    }
  );

  // 彻底删除
  const { run: deleteQuestion } = useRequest(
    async () => await deleteQuestionsService(selectedIds),
    {
      manual: true,
      onSuccess() {
        message.success("删除成功");
        refresh();
        setSelectedIds([]);
      },
    }
  );
  const tableElem = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button
            type="primary"
            disabled={selectedIds.length === 0}
            onClick={recover}
          >
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={(q) => q._id}
        rowSelection={{
          type: "checkbox",
          onChange: (selectRowKeys) => {
            setSelectedIds(selectRowKeys as string[]);
          },
        }}
      />
    </>
  );

  // 删除函数
  function del() {
    confirm({
      title: "确认彻底删除该问卷？",
      icon: <ExclamationCircleOutlined />,
      content: "删除以后不可以找回",
      onOk: deleteQuestion,
    });
  }

  return (
    <TrashWrapper>
      <div className="header">
        <div className="left">
          <Title level={3}>回收站</Title>
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
        {!loading && list.length > 0 && tableElem}
      </div>
      <div className="footer">
        <ListPage total={total} />
      </div>
    </TrashWrapper>
  );
};
export default memo(Trash);
