import {
  ComponentStateType,
  componentInfoType,
} from "../store/modules/Edit/component";

export default function insertNewComponent(
  state: ComponentStateType,
  newComponent: componentInfoType
) {
  const { componentList, selectedId } = state;
  const newComponentList = [...componentList];
  // 找到当前选中的组件的index
  const index = componentList.findIndex((i) => i.fe_id == selectedId);
  if (index < 0) {
    //  未选中任何组件 直接添加到最后一个
    newComponentList.push(newComponent);
  } else {
    // 选中了组件 插入到 index 后面
    newComponentList.splice(index + 1, 0, newComponent);
  }
  // 重新设置组件id
  state.selectedId = newComponent.fe_id;
  state.componentList = newComponentList;
}
