import type { FC } from "react";
import EditInputConf, { EditInputProps } from "./EditInput";
import EditTitleConf, { EditTitlePropsType } from "./EditTitle";
import EditParagraphConf, { EditParagraphPropsType } from "./EditParagraph";
import EditInfoConf, { EditInfoPropsType } from "./EditInfo";
import EditTextareaConf, { EditTextareaPropsType } from "./EditTextarea";
import EditRadioConf, {
  EditRadioPropsType,
  EditRadioStatPropsType,
} from "./EditRadio";
import EditCheckboxConf, {
  EditCheckboxPropsType,
  EditCheckboxStatPropsType,
} from "./EditCheckbox";

// 各个组件的 prop type
export type ComponentPropsType = EditInputProps &
  EditTitlePropsType &
  EditParagraphPropsType &
  EditInfoPropsType &
  EditTextareaPropsType &
  EditRadioPropsType &
  EditCheckboxPropsType;

// 统一 各个组件的统计属性类型
type ComponentStatPropsType = EditRadioStatPropsType &
  EditCheckboxStatPropsType;

// 统一,组件的配置
export type ComponentConfType = {
  title: string;
  type: string;
  // 左侧面板展示需要
  Component: FC<ComponentPropsType>;
  // 右侧属性面板需要
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
  StatComponent?: FC<ComponentStatPropsType>;
};

// 全部的组件配置的列表
const componentConfList: ComponentConfType[] = [
  EditInputConf,
  EditTitleConf,
  EditParagraphConf,
  EditInfoConf,
  EditTextareaConf,
  EditRadioConf,
  EditCheckboxConf,
];

// 组件分组
// 左侧面板需要组件分组
export const componentConfGroup = [
  {
    groupName: "文本显示",
    components: [EditInfoConf, EditTitleConf, EditParagraphConf],
  },
  {
    groupName: "用户输入",
    components: [EditInputConf, EditTextareaConf],
  },
  {
    groupName: "用户选择",
    components: [EditRadioConf, EditCheckboxConf],
  },
];

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}
