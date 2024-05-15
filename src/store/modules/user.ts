import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const INIT_STATE = {
  nickname: "",
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (state, { payload }) => {
      state.username = payload.username;
      state.nickname = payload.nickname;
    },
    logoutReducer: () => INIT_STATE,
  },
});

export const { loginReducer, logoutReducer } = userSlice.actions;
export default userSlice.reducer;
