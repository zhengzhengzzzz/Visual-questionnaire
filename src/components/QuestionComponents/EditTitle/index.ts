import Component from "./Component";
import { EditTitleDefaultProps } from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

export default {
  title: "标题",
  type: "EditTitle", //要和后端统一好
  Component, //画布显示的组件
  PropComponent, //右侧属性组件
  defaultProps: EditTitleDefaultProps,
};
