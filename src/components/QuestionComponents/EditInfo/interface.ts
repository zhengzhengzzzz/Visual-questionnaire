export type EditInfoPropsType = {
  title?: string;
  desc?: string;
  onChange?: (newProps: EditInfoPropsType) => void;
  disabled?: boolean;
};

export const EditInfoDefaultProps: EditInfoPropsType = {
  title: "问卷标题",
  desc: "问卷描述",
};
