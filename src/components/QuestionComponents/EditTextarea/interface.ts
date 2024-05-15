export type EditTextareaPropsType = {
  title?: string;
  placeholder?: string;
  onChange?: (newProps: EditTextareaPropsType) => void;
  disabled?: boolean;
};

export const EditTextareaDefaultProps: EditTextareaPropsType = {
  title: "请输入标题",
  placeholder: "请输入...",
};
