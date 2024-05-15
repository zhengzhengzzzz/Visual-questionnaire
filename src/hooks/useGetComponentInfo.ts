import { shallowEqual, useSelector } from "react-redux";
import { ComponentStateType } from "../store/modules/Edit/component";
import { useAppSelector } from "../store";

export default function useGetComponentInfo() {
  const { componentList, selectedId, copiedComponent } = useAppSelector(
    (state) => ({
      componentList: state.component.present.componentList,
      selectedId: state.component.present.selectedId,
      copiedComponent: state.component.present.copiedComponent,
    }),
    shallowEqual
  );

  // 获取选中的组件
  const selectedComponent = componentList.find((c) => c.fe_id == selectedId);

  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
  };
}
