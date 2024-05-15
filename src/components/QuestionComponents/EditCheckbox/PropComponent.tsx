import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import {
  EditCheckboxDefaultProps,
  EditCheckboxPropsType,
  OptionType,
} from "./interface";
import { Button, Checkbox, Form, Input, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";

const PropComponent: FC<EditCheckboxPropsType> = (
  props: EditCheckboxPropsType
) => {
  const [form] = Form.useForm();
  const { title, isVertical, list = [], disabled, onChange } = props;
  function handleValueChange() {
    if (onChange == null) return;
    const newValue = form.getFieldsValue() as EditCheckboxPropsType;
    const { list = [] } = newValue;
    list?.forEach((l) => {
      if (l.value) return;
      l.value = nanoid(5);
    });
    onChange(newValue);
  }
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ title, isVertical, list }}
      disabled={disabled}
      onValuesChange={handleValueChange}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item name={[name, "checked"]} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                    <Form.Item
                      name={[name, "text"]}
                      rules={[
                        { required: true, message: "请输入选项文字" },
                        {
                          validator: (_, text) => {
                            const { list = [] } = form.getFieldsValue();
                            let num = 0;
                            list?.forEach((opt: OptionType) => {
                              if (opt.text === text) num++;
                            });
                            if (num === 1) return Promise.resolve();
                            return Promise.reject(
                              new Error("和其他选项重复了")
                            );
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项文字..." />
                    </Form.Item>
                    {index > 0 && (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                  </Space>
                );
              })}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: "", value: "" })}
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};
export default memo(PropComponent);
