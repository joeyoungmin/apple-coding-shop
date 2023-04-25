import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "../store/userSlice";

//user파일은 분할관리하고있음
let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    PlusBtn(state, action) {
      let nums = state.findIndex((a) => a.id === action.payload);
      state[nums].count++;
    },
    MinusBtn(state, action) {
      let nums = state.findIndex((a) => a.id === action.payload);
      if (state[nums].count > 1) state[nums].count--;
    },
    ClickBtn(state, action) {
      state.push(action.payload);
    },
    deleteBtn(state, action) {
      action.payload.remove();
    },
  },
});
export let { PlusBtn, MinusBtn, ClickBtn, deleteBtn } = cart.actions;
export default configureStore({
  reducer: {
    cart: cart.reducer,
    user: user.reducer,
  },
});
