export type EditParagraphPropsType = {
  text?: string;
  isCenter?: boolean;
  onChange?: (newProps: EditParagraphPropsType) => void;
  disabled?: boolean;
};

export const EditParagraphDefaultProps: EditParagraphPropsType = {
  text: "一行段落",
  isCenter: false,
};
