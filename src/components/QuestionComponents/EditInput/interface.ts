export type EditInputProps = {
  title?: string;
  placeholder?: string;
  onChange?: (newProps: EditInputProps) => void; //监听右侧属性表单变化 同步到store中
  disabled?: boolean;
};
// 默认属性
export const EditInputDefaultProps: EditInputProps = {
  title: "输入框标题",
  placeholder: "请输入...",
};
