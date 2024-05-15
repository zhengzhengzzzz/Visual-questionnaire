import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { useState } from "react";
import { QuestionCardWrapper } from "./style";
import { Button, Divider, Modal, Popconfirm, Space, Tag, message } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import {
  duplicateQuestionService,
  updateQuestionService,
} from "../../services/question";

interface IProps {
  children?: ReactNode;
  title: string;
  _id: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createAt: string;
  isDeleted: boolean;
}

const { confirm } = Modal;

const QuestionCard: FC<IProps> = (props) => {
  const { _id, title, isPublished, isStar, answerCount, createAt, isDeleted } =
    props;
  const nav = useNavigate();

  // 标星 state
  const [starState, setStarState] = useState(isStar);
  // 删除 state
  const [isDeletedState, setIsDeletedState] = useState(false);

  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !starState });
    },
    {
      manual: true,
      onSuccess() {
        setStarState(!starState);
        message.success("已更新");
      },
    }
  );

  // 删除
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success("删除成功");
        setIsDeletedState(true);
      },
    }
  );

  function del() {
    confirm({
      title: "确定删除该问卷？",
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    });
  }

  // 复制
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    // async () => {
    //   const data = await duplicateQuestionService(_id);
    //   return data;
    // },
    async () => await duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess(result) {
        message.success("复制成功");
        nav(`/question/edit/${result.id}`);
      },
    }
  );

  if (isDeletedState) return null;
  return (
    <QuestionCardWrapper>
      <div className="title">
        <div className="left">
          <Link
            to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            <Space>
              {starState && <StarOutlined style={{ color: "red" }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className="right">
          <Space>
            {isPublished ? (
              <Tag color="processing">已发布</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷：{answerCount}</span>
            <span>{createAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <div className="button-container">
        <div className="left">
          <Space>
            <Button
              icon={<EditOutlined />}
              size="small"
              type="text"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              size="small"
              type="text"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className="right">
          <Space>
            <Button
              icon={<StarOutlined />}
              size="small"
              type="text"
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {starState ? "取消标星" : "标星"}
            </Button>
            <Popconfirm
              title="确定复制该问卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button
                icon={<CopyOutlined />}
                size="small"
                type="text"
                disabled={duplicateLoading}
                onClick={duplicate}
              >
                复制
              </Button>
            </Popconfirm>
            <Button
              icon={<DeleteOutlined />}
              size="small"
              type="text"
              onClick={del}
              disabled={deleteLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </QuestionCardWrapper>
  );
};
export default memo(QuestionCard);
