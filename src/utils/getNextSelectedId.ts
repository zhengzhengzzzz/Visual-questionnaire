// import { componentInfoType } from "../store/modules/Edit/component";
import { componentInfoType } from "../store/modules/Edit/component";

// export default function getNextSelectedId(
//   selectedId: string,
//   componentList: Array<componentInfoType>
// ) {
//   // 找不到要删除的组件
//   const index = componentList.findIndex((c) => {
//     c.fe_id == selectedId;
//   });
//   if (index < -1) return "";
//   const len = componentList.length;
//   if (len <= 1) {
//     selectedId = "";
//   } else if (index == len - 1) {
//     selectedId = componentList[index - 1].fe_id;
//   } else {
//     selectedId = componentList[index + 1].fe_id;
//   }
// }

export function getNextSelectedId(
  fe_id: string,
  componentList: componentInfoType[]
) {
  const visibleComponent = componentList.filter((c) => !c.isHidden);
  const index = visibleComponent.findIndex((c) => c.fe_id === fe_id);

  if (index < 0) return "";

  let newSelectedId = "";

  const len = visibleComponent.length;

  if (len <= 1) {
    // 组件长度就剩一个了  被删除就没有
    newSelectedId = "";
  } else {
    if (index + 1 === len) {
      // 要删除最后一个了
      newSelectedId = visibleComponent[index - 1].fe_id;
    } else {
      // 要删除的不是最后一个  删除以后 选中下一个
      newSelectedId = visibleComponent[index + 1].fe_id;
    }
  }
  return newSelectedId;
}
