import { useRequest } from "ahooks";
import { Typography } from "antd";
import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { useParams } from "react-router-dom";
import { getComponentStatService } from "../../../../services/stat";
import { getComponentConfByType } from "../../../../components/QuestionComponents";

interface IProps {
  children?: ReactNode;
  selectedComponentId: string;
  selectedComponentType: string;
}

const { Title } = Typography;

const ChartStat: FC<IProps> = (props: IProps) => {
  const { selectedComponentId, selectedComponentType } = props;
  const { id = "" } = useParams();
  const [stat, setStat] = useState([]);
  const { run } = useRequest(
    async (questionId, componentId) =>
      await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat);
      },
    }
  );
  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId);
  }, [selectedComponentId]);

  // 生成统计图表
  function genStatElem() {
    if (!selectedComponentId) return <div>未选中组件</div>;
    const { StatComponent } =
      getComponentConfByType(selectedComponentType) || {};
    if (StatComponent == null) return <div>该组件无统计图表</div>;
    return <StatComponent stat={stat} />;
  }
  return (
    <>
      <Title level={3}>图表统计</Title>
      <div>{genStatElem()}</div>
    </>
  );
};
export default memo(ChartStat);
