export type EditTitlePropsType = {
  // 没必要全部都传  不传就默认属性
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  isCenter?: boolean;
  onChange?: (newProps: EditTitlePropsType) => void;
  disabled?: boolean;
};

// 默认属性
export const EditTitleDefaultProps: EditTitlePropsType = {
  text: "一行标题",
  level: 1,
  isCenter: false,
};
