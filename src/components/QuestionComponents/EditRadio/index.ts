import Component from "./Component";
import PropComponent from "./PropComponent";
import { EditRadioDefaultProps } from "./interface";
import StatComponent from "./StatComponent";

export * from "./interface";

export default {
  title: "单选",
  type: "EditRadio",
  Component,
  PropComponent,
  defaultProps: EditRadioDefaultProps,
  StatComponent,
};
