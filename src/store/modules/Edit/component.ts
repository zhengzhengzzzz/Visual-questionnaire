import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../../components/QuestionComponents";
import { getNextSelectedId } from "../../../utils/getNextSelectedId";
import cloneDeep from "lodash.clonedeep";
import { nanoid } from "nanoid";
import { arrayMove } from "@dnd-kit/sortable";
import insertNewComponent from "../../../utils/insertNewComponent";

// 单个组件信息
export type componentInfoType = {
  fe_id: string; //前端生成的id 服务端Mongodb 不认这种格式
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType; //组件类型需要的属性
};

export type ComponentStateType = {
  selectedId: string; //选中组件的id
  componentList: componentInfoType[]; //组件列表
  copiedComponent: componentInfoType | null;
};

// 初始化信息
const INIT_STATE: ComponentStateType = {
  selectedId: "",
  componentList: [],
  copiedComponent: null,
};

export const componentSlice = createSlice({
  name: "component",
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponent(state, { payload }) {
      return payload;
    },
    // 修改 selectedID
    changeSelectedId(state, { payload }: PayloadAction<string>) {
      state.selectedId = payload;
      // react state不可变数据 写法
    },
    // 添加新组件（点击左侧组件库添加到画布）
    addComponent(state, { payload }) {
      insertNewComponent(state, payload);
    },
    // 修改组件属性
    changeComponentProps(state, { payload }) {
      const { fe_id, newProps } = payload;
      // 当前要修改属性的组件
      const curComponent = state.componentList!.find((c) => c.fe_id == fe_id);
      if (curComponent) {
        curComponent.props = { ...curComponent.props, ...newProps };
        // const newComponentList = [...componentList, curComponent];
        // state.componentList = newComponentList;
      }
    },
    // 删除选中组件
    deleteSelectedComponent(state) {
      const newComponentList = [...state.componentList]; //不可变值
      const selectedId = state.selectedId;
      // 重新设置selectedId
      const newSelectedId = getNextSelectedId(
        state.selectedId,
        state.componentList
      );
      state.selectedId = newSelectedId;

      const index = newComponentList.findIndex((c) => c.fe_id == selectedId);
      newComponentList.splice(index, 1);
      state.componentList = [...newComponentList];
    },
    // 显示隐藏组件
    changeComponentHidden(
      state,
      { payload }: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) {
      const { fe_id, isHidden } = payload;
      const componentList = state.componentList;
      let newSelectedId = "";
      // 重新设置selectedId
      if (isHidden) {
        newSelectedId = getNextSelectedId(
          state.selectedId,
          state.componentList
        );
      } else {
        newSelectedId = fe_id;
      }
      state.selectedId = newSelectedId;

      const curComponent = componentList.find((c) => c.fe_id == fe_id);
      if (curComponent) {
        curComponent!.isHidden = isHidden;
      }
    },
    // 锁定 解锁组件
    toggleComponentLocked(
      state,
      { payload }: PayloadAction<{ fe_id: string }>
    ) {
      const { fe_id } = payload;
      const componentList = state.componentList;
      const curComponent = componentList!.find((c) => c.fe_id == fe_id);
      if (curComponent) {
        curComponent.isLocked = !curComponent.isLocked;
      }
    },
    // 拷贝当前选中组件
    copySelectedComponent(state) {
      const { selectedId, componentList = [] } = state;
      const curComponent = componentList!.find((c) => c.fe_id == selectedId);
      if (curComponent) {
        state.copiedComponent = cloneDeep(curComponent);
      }
    },
    // 粘贴组件
    pasteCopiedComponent(state) {
      const { copiedComponent } = state;
      if (copiedComponent == null) return;
      // 一定要修改复制组件的id 重要!!!
      copiedComponent.fe_id = nanoid();

      insertNewComponent(state, copiedComponent);
    },
    // 选中上一个组件
    selectPrevComponent(state) {
      const { componentList, selectedId } = state;
      const index = componentList!.findIndex((c) => c.fe_id == selectedId);
      if (index <= 0) return;
      const newId = componentList[index - 1].fe_id;
      state.selectedId = newId;
    },
    // 选中下一个组件
    selectNextComponent(state) {
      const { componentList, selectedId } = state;
      const index = componentList!.findIndex((c) => c.fe_id == selectedId);
      if (index < 0 || index == componentList.length - 1) return;
      const newId = componentList[index + 1].fe_id;
      state.selectedId = newId;
    },
    // 修改组件标题
    changeComponentTitle(
      state,
      { payload }: PayloadAction<{ fe_id: string; title: string }>
    ) {
      const { title, fe_id } = payload;
      const componentList = state.componentList;
      const curComponent = componentList!.find((c) => c.fe_id == fe_id);
      if (curComponent) {
        curComponent!.title = title;
      }
    },
    // 移动组件位置
    moveComponent(
      state,
      { payload }: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) {
      const { componentList: curComponent } = state;
      const { oldIndex, newIndex } = payload;
      state.componentList = arrayMove(curComponent, oldIndex, newIndex);
    },
  },
});

export const {
  resetComponent,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  deleteSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentSlice.actions;
export default componentSlice.reducer;
