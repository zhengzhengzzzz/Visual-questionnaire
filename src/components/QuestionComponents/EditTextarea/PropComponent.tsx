import React, { memo, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { EditTextareaPropsType } from "./interface";
import { Form, Input } from "antd";

const PropComponent: FC<EditTextareaPropsType> = (
  props: EditTextareaPropsType
) => {
  const { title, placeholder, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);
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
