import React, { memo, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { PageSettingWrapper } from "./style";
import useGetPageInfo from "../../../../../../../hooks/useGetPageInfo";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { resetPageInfo } from "../../../../../../../store/modules/Edit/pageInfo";

const { TextArea } = Input;

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  // 事实更新表单内容
  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo]);

  function onValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()));
  }
  return (
    <PageSettingWrapper>
      <Form
        form={form}
        layout="vertical"
        initialValues={pageInfo}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          label="网页标题"
          name="title"
          rules={[{ required: true, message: "请输入标题" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="问卷描述" name="desc">
          <TextArea placeholder="问卷描述..." />
        </Form.Item>
        <Form.Item label="样式代码" name="css">
          <TextArea placeholder="输入css样式代码..." />
        </Form.Item>
        <Form.Item label="脚本代码" name="js">
          <TextArea placeholder="输入js脚本代码..." />
        </Form.Item>
      </Form>
    </PageSettingWrapper>
  );
};
export default memo(PageSetting);
