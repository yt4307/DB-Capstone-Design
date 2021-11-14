import express, { application } from "express"; // express 모듈을 import
import logger from "morgan"; // 이런식으로 다른 이름으로 import 할 수도 있음
import path from "path";

import homeRouter from "../routes/home"; // 유저가 작성한 모듈을 import
import updateRouter from "../routes/update"; // 상대경로 지정
import selectRouter from "../routes/select"; // .. 은 부모 디렉터리

const PORT = 3000; // 웹 서버에 사용 될 포트번호는 3000으로 지정
// 원하는 값으로 지정해줄 수 있지만 보통 well-known포트를 피하기 위해 10000번대 이상을 많이 쓴다.

const app = express(); // http 기능을 래핑해 내부 기능을 잘 알지 못해도 잘 연결 해줄 수 있게 해주는 모듈
// app 변수를 통해 express의 기능을 사용할 것

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");

app.use(logger("dev"));

// 각각의 라우트 주소를 지정
// 주소/라우트
app.use('/', homeRouter); // home화면을 의미하는 라우트
app.use("/update", updateRouter);
app.use("/select", selectRouter);

// 서버를 실행시키는 부분
app.listen(PORT, () => {
    // 서버가 잘 실행이 됐는지 확인하기 위해 console log를 찍음
    console.log(`Example app listening at http://localhost:${PORT}`);
})