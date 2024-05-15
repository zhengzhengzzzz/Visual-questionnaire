import React, { memo, useMemo } from "react";
import type { FC, ReactNode } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { STAT_COLORS } from "../../../constant";
import { EditRadioStatPropsType } from "./interface";

// 格式化百分比
function format(n: number) {
  return (n * 100).toFixed(2);
}

const StatComponent: FC<EditRadioStatPropsType> = (
  props: EditRadioStatPropsType
) => {
  const { stat = [] } = props;
  //   count 求和
  const sum = useMemo(() => {
    let s = 0;
    stat.forEach((i) => (s += i.count));
    return s;
  }, [stat]);
  return (
    <div style={{ width: "300px", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="count"
            data={stat}
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
            label={(i) => `${i.name}:${format(i.count / sum)}%`}
          >
            {stat.map((i, index) => {
              return <Cell key={index} fill={STAT_COLORS[index]} />;
            })}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default memo(StatComponent);
