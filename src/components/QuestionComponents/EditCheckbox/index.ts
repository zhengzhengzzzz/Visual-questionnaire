import Component from "./Component";
import PropComponent from "./PropComponent";
import { EditCheckboxDefaultProps } from "./interface";
import StatComponent from "./StatComponent";

export * from "./interface";

// 组件的配置
export default {
  title: "多选",
  type: "EditCheckbox",
  Component,
  PropComponent,
  defaultProps: EditCheckboxDefaultProps,
  StatComponent,
};
