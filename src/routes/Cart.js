import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, changeage } from "./../store/userSlice";
import { PlusBtn, MinusBtn, deleteBtn } from "./store";
import { useState, memo, useMemo } from "react";

// let Child = memo(function () {
//   console.log("재랜더링됨");
//   return <div>자식임</div>;
// });
//memo는 꼭 필요할때만 재랜더링해주세요~ 라는 뜻임

function 함수() {
  return;
}

function Cart() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  let memo = useMemo(() => {
    return 함수();
  }, [state]);
  //store.js에 요청보내줌
  let [count, setCount] = useState(0);
  return (
    <div>
      {/* <Child count={count}></Child>
      <button onClick={() => setCount(count + 1)}>+</button> */}
      {state.user.name}
      {state.user.age}의 바구니
      <button
        onClick={() => {
          dispatch(changeage(5));
          //화물을 실어보내는 화물차임
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch(changeName());
        }}
      >
        btn
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a, i) => (
            <tr key={i}>
              <td>{state.cart[i].id}</td>
              <td>{state.cart[i].name}</td>
              <td>{state.cart[i].count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(PlusBtn(state.cart[i].id));
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => {
                    dispatch(MinusBtn(state.cart[i].id));
                  }}
                >
                  -
                </button>
              </td>
              <button
                onClick={(e) => {
                  dispatch(deleteBtn(e.target.parentElement));
                }}
              >
                삭제
              </button>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
