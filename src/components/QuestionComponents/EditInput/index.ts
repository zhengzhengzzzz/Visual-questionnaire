import Component from "./Component";
import { EditInputDefaultProps } from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

export default {
  title: "输入框",
  type: "EditInput", //要和后端统一好
  Component,
  PropComponent,
  defaultProps: EditInputDefaultProps,
};
