/* eslint-disable */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import { Context1 } from "../App.js";
import { Link } from "react-router-dom";
import { ClickBtn } from "./store.js";
import { useDispatch } from "react-redux";

let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10px;
`;
let LastProductStyle = styled.div`
  border-top: 1px solid blue;
`;

//장점1.css파일필요없음
//장점2.스타일이 다른js파일로 오염되지않음
//장점3.페이지 로딩시간 단축
//props로 컴포넌트 재활용가능
//외부 라이브러리 사용법임, 이해보다는 사용방법을 아는게 맞음 ㅇㅇ
//당연히 간단한 프로그래밍도 가넝하다
//기존스타일 복사가능

//단점1.JS파일 개복잡해짐
//단점2.중복스타일은 컴포넌트간 import할텐데 css와 다를 바가 없군;;
//3.협업시 css담당의 숙련도 이슈가 있음;;;;;;;;;;

function Detail(props) {
  let dispatch = useDispatch();
  let { 재고, shoes } = useContext(Context1);
  var 룰루 = localStorage.getItem("watched");
  룰루 = JSON.parse(룰루);
  useEffect(() => {
    //useEffect안에 적는 코드들은?
    //어려운연산
    //서버에서 데이터가져오는 작업
    //타이머 장착하는거
    //왜 이름이 Effect일까?
    //side Effect :함수의 핵심기능과 상관없는 부가기능
    let Timer = setTimeout(() => {
      {
        setCount(false);
      }
    }, 2000);
    return () => {
      clearTimeout(Timer);
      //clean up function 버그방지코드
    };
  }, []);

  //mount,update시 코드 실행해주는 useEffect(lifecycle)
  //useEffect는 html렌더링 후에 동작합니다.
  let [count, setCount] = useState(true);
  let [number, setNumber] = useState("");
  let [opy, setOpacity] = useState("");
  // const [viewCalendar, setViewCalendar] = useState(true);
  useEffect(() => {
    setOpacity("end");
    return () => {
      setOpacity(" ");
    };
  }, []);
  useEffect(() => {
    if (isNaN(number) == true) {
      alert("그러지마세요");
    }
  }, [number]);
  useEffect(() => {
    let 찾은거 = localStorage.getItem("watched");
    찾은거 = JSON.parse(찾은거);
    찾은거.push(찾은상품.id);
    찾은거 = new Set(찾은거);
    찾은거 = Array.from(찾은거);
    localStorage.setItem("watched", JSON.stringify(찾은거));
  });
  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (x) {
    return x.id == id;
  });
  let [탭, 탭변경] = useState(0);
  return (
    <div className={`container start ${opy}`}>
      {count == true ? (
        <div className="alert alert-warning">
          2초이내 구매시 할인
          <YellowBtn bg="yellow">BUY</YellowBtn>
        </div>
      ) : null}
      <input
        onChange={(e) => {
          setNumber(e.target.value);
        }}
      />
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <Link to={"/Cart"}>
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch(
                  ClickBtn({ id: shoes[1].id, name: shoes[1].title, count: 1 })
                );
              }}
            >
              주문하기
            </button>
          </Link>
        </div>
      </div>
      <div className="Product_box">
        <p>최근본상품</p>
        <LastProductStyle>
          {룰루.map((a, i) => {
            return (
              <div>
                <img
                  src={
                    "https://codingapple1.github.io/shop/shoes" +
                    (i + 1) +
                    ".jpg"
                  }
                  width="100%"
                />
                <h5>{props.shoes[i].title}</h5>
                <p>{props.shoes[i].price}</p>
              </div>
            );
          })}
        </LastProductStyle>
      </div>
      ;
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(0);
            }}
            eventKey="link0"
          >
            HTML
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(1);
            }}
            eventKey="link1"
          >
            CSS
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(2);
            }}
            eventKey="link2"
          >
            JS
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent shoes={props.shoes} 탭={탭} />
    </div>
  );
}
function TabContent({ 탭 }) {
  let [fade, setFade] = useState("");
  let { 재고 } = useContext(Context1);
  useEffect(() => {
    let Timer = setTimeout(() => {
      setFade("end");
    }, 100);
    //리액트의 automatic batching 마지막에 재랜더링 한번해줌 ㅋㅋ;;
    return () => {
      clearTimeout(Timer); //버그방지로넣음ㅋ
      setFade(" ");
    };
  }, [탭]);
  return (
    <div className={`start  ${fade}`}>
      {[<div>{재고}</div>, <div>내용2</div>, <div>내용3</div>][탭]}
    </div>
  );
}

//1. state 변경시 쓸데없는 컴포넌트까지 전부 재렌더링이 되고
//2. useContext() 를 쓰고 있는 컴포넌트는 나중에 다른 파일에서 재사용할 때 Context를 import 하는게 귀찮아질 수 있습니다.
//그래서 이것 보다는 redux 같은 외부라이브러리를 많이들 사용합니다.
export default Detail;
