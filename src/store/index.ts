import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import userReducer from "./modules/user";
import componentReducer, { ComponentStateType } from "./modules/Edit/component";
import PageInfoReducer from "./modules/Edit/pageInfo";
import undoable, { StateWithHistory, excludeAction } from "redux-undo";

export type StateType = {
  component: StateWithHistory<ComponentStateType>;
};

const store = configureStore({
  reducer: {
    user: userReducer,
    // 没有 undo
    // component: componentReducer,
    //  增加了undo
    component: undoable(componentReducer, {
      limit: 20, //限制undo 20 步
      filter: excludeAction([
        "component/resetComponents",
        "component/changeSelectedId",
        "component/selectPrevComponent",
        "component/selectNextComponent",
      ]),
    }),
    pageInfo: PageInfoReducer,
  },
});

type GetStateFnType = typeof store.getState;
export type IRootState = ReturnType<GetStateFnType>;
type DispatchType = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;
export default store;
