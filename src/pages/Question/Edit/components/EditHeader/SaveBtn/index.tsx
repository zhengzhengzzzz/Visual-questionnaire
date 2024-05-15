import { Button, message } from "antd";
import React, { memo, useRef, useState } from "react";
import type { FC } from "react";
import useGetComponentInfo from "../../../../../../hooks/useGetComponentInfo";
import useGetPageInfo from "../../../../../../hooks/useGetPageInfo";
import { useParams } from "react-router-dom";
import { useDebounceEffect, useKeyPress } from "ahooks";
import { updateQuestionService } from "../../../../../../services/question";
import { LoadingOutlined } from "@ant-design/icons";
import axios, { Canceler } from "axios"; // 引入 axios 和 CancelToken

const SaveBtn: FC = () => {
  //保存的信息
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false); // 新增布尔状态来表示是否有自动保存请求正在进行中

  // 记录取消请求的函数
  const cancelRequestRef = useRef<Canceler | null>(null);

  const save = async () => {
    if (!id) return;
    // 如果存在取消请求的函数，调用它取消之前的请求
    if (cancelRequestRef.current) {
      cancelRequestRef.current("用户取消操作。");
    }
    // 发送新请求并保存取消请求的函数
    const source = axios.CancelToken.source();
    cancelRequestRef.current = source.cancel;
    setLoading(true);
    const requestData = {
      ...pageInfo,
      componentList,
      cancelToken: source.token,
    };
    await updateQuestionService(id, requestData)
      .then(() => {
        message.success("保存成功");
      })
      .catch((error) => {
        message.warning("保存失败，请稍后再试");
      })
      .finally(() => {
        // 请求完成后将取消请求的函数设置为 null
        cancelRequestRef.current = null;
        setLoading(false);
        setAutoSaving(false); // 在请求完成后将自动保存状态设置为false
      });
  };

  //   快捷键
  useKeyPress(["ctrl.s", "meta.s"], (event: KeyboardEvent) => {
    // 防止出现网页保存的默认行为
    event.preventDefault();
    if (!loading && !autoSaving) {
      // 确保不在加载中且没有自动保存请求正在进行中时才执行手动保存
      save();
    }
  });

  //自动保存 防抖版useEffet
  useDebounceEffect(
    () => {
      setAutoSaving(true);
      save();
    },
    [componentList, pageInfo],
    {
      wait: 1000,
    }
  );

  return (
    <Button
      onClick={save}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      保存
    </Button>
  );
};
export default memo(SaveBtn);
