/* eslint-disable */
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import bg from "./img/image1.jpg";
import {
  useState,
  useEffect,
  createContext,
  useTransition,
  useDeferredValue,
} from "react";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/detail.js";
import axios from "axios";
import Cart from "./routes/Cart";
import { useQuery } from "react-query";

export let Context1 = createContext();

//보관함이라고 생각하삼

function App() {
  let [shoes, setShoes] = useState(data);
  let [재고] = useState([10, 11, 12]);
  let navigate = useNavigate();
  let [counter, setCounter] = useState(0);
  let [loding, setLoding] = useState(false);
  let get_local = JSON.parse(localStorage.getItem("data"));
  let [name, setName] = useState("");
  let a = new Array(10000).fill(0);
  let [isPending, 늦게처리] = useTransition();
  let state = useDeferredValue(name);
  // let 타이머 = setTimeout(() => {
  //   setLoding(true);
  // }, 2000);

  //페이지이동도와줌

  useEffect(() => {
    get_local === null
      ? localStorage.setItem("watched", JSON.stringify([]))
      : null;
  }, []);

  let result = useQuery(
    "작명",
    () =>
      axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
        return a.data;
      }),
    { staleTime: 2000 }
  );
  //리엑트쿼리 장점1. 성공/실패/로딩중 쉽게 파악가능
  // .data,.isLoading,.error

  return (
    <div className="App">
      <input
        onChange={(e) => {
          늦게처리(() => {
            setName(e.target.value);
            //코드 시작을 뒤로 늦추어줌
          });
        }}
      />
      {isPending
        ? "로딩중"
        : a.map(() => {
            return <div>{state}</div>;
          })}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              홈
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              디테일
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about");
              }}
            >
              어바웃
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/event");
              }}
            >
              이벤트
            </Nav.Link>
          </Nav>
          <Nav className="me-auto" color="#fff">
            {result.isLoading && "로딩중"}
            {result.error && "에러남"}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div
                className="main-bg"
                style={{ backgroundImage: "url(" + bg + ")" }}
              ></div>
              <div className="container">
                <div className="row">
                  {shoes.map((a, i) => {
                    return <Card shoes={shoes[i]} i={i + 1} key={i} />;
                  })}
                </div>
              </div>
              {loding == true ? <Loding /> : null}
              <Button
                onClick={() => {
                  setCounter(counter + 1);
                  setLoding(true);
                  counter == 0
                    ? axios
                        .get("https://codingapple1.github.io/shop/data2.json")
                        .then((결과) => {
                          setLoding(false);
                          let copy = [...shoes, ...결과.data];
                          setShoes(copy);
                        })
                        .catch(() => {
                          console.log("실패함");
                          setLoding(false);
                        })
                    : null;

                  counter == 1
                    ? axios
                        .get("https://codingapple1.github.io/shop/data2.json")
                        .then((결과) => {
                          setLoding(false);
                          let copy = [...shoes, ...결과.data];
                          setShoes(copy);
                        })
                        .catch(() => {
                          console.log("실패함");
                          setLoding(false);
                        })
                    : null;

                  counter == 2 ? alert("상품없어요 ㅈㅅㅈㅅ") : null;
                  counter == 2 ? setLoding(false) : null;
                }}
              >
                버튼
              </Button>

              {/* {url.map((a, i) => {
                return (
                  <div className="product_wrap">
                    <Test key={i} 사진={url[i]} 상품이름={datas[i]} />
                  </div>
                );
              })} */}
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <>
              {
                <Context1.Provider value={{ 재고, shoes }}>
                  <Detail shoes={shoes} />
                </Context1.Provider>
              }
            </>
          }
        />
        <Route path="/about" element={<>{<About />}</>}>
          <Route path="/about/member" element={<div>멤버임</div>} />
          <Route path="/about/location" element={<div>위치정보임</div>} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/event" element={<EventPage />}>
          <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}></Route>
          <Route path="two" element={<p>생일기념 쿠폰받기</p>}></Route>
        </Route>
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

function EventPage() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Loding() {
  return <div className="loding">로딩중입니다 ㄱㄷㄱㄷ</div>;
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"}
        width="80%"
      />
      <h4>{props.shoes?.title}</h4>
      <h4>{props.shoes?.content}</h4>
      <p>{props.shoes?.price}</p>
    </div>
  );
}

export default App;
