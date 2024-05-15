import React, { memo, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { EditTitlePropsType } from "./interface";
import { Checkbox, Form, Input, Select } from "antd";

const PropComponent: FC<EditTitlePropsType> = (props: EditTitlePropsType) => {
  const { text, level, isCenter, onChange, disabled } = props;
  const [form] = Form.useForm();

  // 监听属性变化  实时显示
  useEffect(() => {
    form.setFieldsValue({
      text,
      level,
      isCenter,
    });
  }, [text, level, isCenter]);

  function handleValueChange() {
    if (onChange) onChange(form.getFieldsValue());
  }
  return (
    <Form
      onValuesChange={handleValueChange}
      form={form} //挂载form实例
      layout="vertical"
      disabled={disabled}
      initialValues={{ text, level, isCenter }}
    >
      <Form.Item
        label="标题内容"
        name="text"
        rules={[{ required: true, message: "请输入标题内容" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        {/* valuePropName:用checked这个属性表示value */}
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};
export default memo(PropComponent);
