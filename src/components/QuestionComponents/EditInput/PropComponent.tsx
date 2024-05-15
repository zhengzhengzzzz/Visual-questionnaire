// 右侧展示的属性组件
import React, { memo, useEffect } from "react";
import type { FC, ReactNode } from "react";
// 引入属性
import { EditInputProps } from "./interface";
import { Form, Input } from "antd";

const PropComponent: FC<EditInputProps> = (props: EditInputProps) => {
  const { title, placeholder, onChange, disabled } = props;

  const [form] = Form.useForm();
  // 监听title 和 placeholder的变化
  useEffect(() => {
    // 更新右侧属性
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);

  // 监听右侧属性表单变化
  function handleValuesChange() {
    if (onChange) onChange(form.getFieldsValue());
  }
  return (
    <Form
      onValuesChange={handleValuesChange}
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  );
};
export default memo(PropComponent);
