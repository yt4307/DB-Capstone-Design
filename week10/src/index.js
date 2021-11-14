import express from "express";
import logger from "morgan";
import path from "path";

// 이번 과제에서 사용될 페이지 경로들
import loginRouter from "../routes/login";
import selectRouter from "../routes/select";
import deleteRouter from "../routes/delete";
import deleteCourseRouter from "../routes/deleteCourse";

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'hbs')

app.use(logger("dev"));

// use 메서드로 미들웨어를 불러와준다.
// 여기서는 use를 통해 router를 설정한다.
app.use('/', loginRouter);
app.use('/select', selectRouter);
app.use('/delete', deleteRouter);
app.use("/deletecourse", deleteCourseRouter);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})