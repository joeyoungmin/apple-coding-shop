import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeName(state) {
      state.name = "park";
      //state수정해주는 함수 만들기
      //파라미터로 터널뚫어주면될듯
      //콤마찍고 계속 바꿔줄수있음
    },
    changeage(state, a) {
      state.age += a.payload;
      //얘가 화물차를 실어나름
    },
  },
});

export let { changeName, changeage } = user.actions;
//state변경함수를 actions라고함 ㅋ

export default user;
