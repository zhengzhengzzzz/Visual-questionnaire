import Component from "./Component";
import { EditTextareaDefaultProps } from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

export default {
  title: "多行输入",
  type: "EditTextarea", //要和后端统一好
  Component,
  PropComponent,
  defaultProps: EditTextareaDefaultProps,
};
