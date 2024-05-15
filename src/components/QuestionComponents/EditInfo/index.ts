import Component from "./Component";
import PropComponent from "./PropComponent";
import { EditInfoDefaultProps } from "./interface";

export * from "./interface";

// 组件的配置
export default {
  title: "问卷信息",
  type: "EditInfo",
  Component,
  PropComponent,
  defaultProps: EditInfoDefaultProps,
};
