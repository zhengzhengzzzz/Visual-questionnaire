import React, { memo, MouseEvent } from "react";
import type { FC, ReactNode } from "react";
import { CanvasWrapper } from "./style";
import type { componentInfoType } from "../../../../store/modules/Edit/component";
import { Spin } from "antd";
import useGetComponentInfo from "../../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../../components/QuestionComponents";
import classNames from "classnames";

interface IProps {
  selectedComponentId: string;
  setselectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
}

function genComponent(componentInfo: componentInfoType) {
  const { type, props } = componentInfo;

  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;

  const { Component } = componentConf;
  return <Component {...props} />;
}

const ComponentList: FC<IProps> = (props) => {
  const {
    selectedComponentId,
    setSelectedComponentType,
    setselectedComponentId,
  } = props;
  const { componentList } = useGetComponentInfo();

  return (
    <CanvasWrapper>
      {componentList &&
        componentList.map((c, inedx) => {
          const { fe_id, type } = c;
          return (
            <div
              key={inedx}
              className={classNames({
                ["component-wrapper"]: true,
                ["selected"]: fe_id === selectedComponentId,
              })}
              onClick={(e) => {
                setselectedComponentId(fe_id);
                setSelectedComponentType(type);
              }}
            >
              <div className="component">{genComponent(c)}</div>
            </div>
          );
        })}
    </CanvasWrapper>
  );
};
export default memo(ComponentList);
