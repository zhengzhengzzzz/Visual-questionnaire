import { Button, message } from "antd";
import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import useGetComponentInfo from "../../../../../../hooks/useGetComponentInfo";
import useGetPageInfo from "../../../../../../hooks/useGetPageInfo";
import { useRequest } from "ahooks";
import { useNavigate, useParams } from "react-router-dom";
import { updateQuestionService } from "../../../../../../services/question";

interface IProps {
  children?: ReactNode;
}
const PublishBtn: FC<IProps> = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();
  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true, //标志着问卷已经被发布
      });
    },
    {
      manual: true,
      onSuccess() {
        message.success("发布成功");
        nav("/question/stat/" + id); //发布成功 跳转到统计页
      },
    }
  );
  return (
    <Button type="primary" onClick={pub} disabled={loading}>
      发布
    </Button>
  );
};
export default memo(PublishBtn);
