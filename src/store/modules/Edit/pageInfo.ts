import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PageInfoType = {
  title: string;
  desc?: string;
  js?: string;
  css?: string;
  isPublished?: boolean;
};

const INIT_STATE: PageInfoType = {
  title: "",
  desc: "",
  js: "",
  css: "",
};

const pageInfoSlice = createSlice({
  name: "pageInfo",
  initialState: INIT_STATE,
  reducers: {
    // 重置页面信息
    resetPageInfo(
      state: PageInfoType,
      { payload }: PayloadAction<PageInfoType>
    ) {
      return payload;
    },
    // 修改标题
    changePageTitle(state, { payload }: PayloadAction<string>) {
      state.title = payload;
    },
  },
});

export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions;
export default pageInfoSlice.reducer;
