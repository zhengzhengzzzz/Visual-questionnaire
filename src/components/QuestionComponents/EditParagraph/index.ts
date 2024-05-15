import Component from "./Component";
import PropComponent from "./PropComponent";
import { EditParagraphDefaultProps } from "./interface";

export * from "./interface";

// 组件的配置
export default {
  title: "段落",
  type: "EditParagraph", //要和后端统一好
  Component,
  PropComponent,
  defaultProps: EditParagraphDefaultProps,
};
