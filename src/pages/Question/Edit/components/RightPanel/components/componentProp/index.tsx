// 右侧面板中的属性面板
import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import useGetComponentInfo from "../../../../../../../hooks/useGetComponentInfo";
import {
  ComponentPropsType,
  getComponentConfByType,
} from "../../../../../../../components/QuestionComponents";
import { useAppDispatch } from "../../../../../../../store";
import { changeComponentProps } from "../../../../../../../store/modules/Edit/component";

// 没有选中组件返回的样式
const NoProp: FC = () => {
  return <div style={{ textAlign: "center" }}>未选中组件</div>;
};

const ComponentProp: FC = () => {
  const dispatch = useAppDispatch();

  const { selectedComponent } = useGetComponentInfo();
  if (selectedComponent == null) return <NoProp />;

  const { type, props, isLocked, isHidden } = selectedComponent;
  // 根据type找到组件的配置
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return <NoProp />;

  const { PropComponent } = componentConf;

  // 监听右侧属性表单变化 同步到store中
  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return; //如果没有选中组件
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
  }
  return (
    <PropComponent
      {...props} //当前选中组件的属性
      onChange={changeProps}
      disabled={isLocked || isHidden}
    />
  );
};
export default memo(ComponentProp);
