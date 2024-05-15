import React, { memo, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { EditParagraphPropsType } from "./interface";
import { Checkbox, Form, Input } from "antd";

// 组件属性表单

const { TextArea } = Input;

const PropComponent: FC<EditParagraphPropsType> = (
  props: EditParagraphPropsType
) => {
  const { text, isCenter, onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ text, isCenter });
  }, [isCenter, text]);

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ text, isCenter }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: "请输入段落内容" }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};
export default memo(PropComponent);
