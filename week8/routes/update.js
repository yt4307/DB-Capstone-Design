import express from "express";
import { selectSql, updateSql } from "../database/sql";

const router = express.Router();

// http 메서드 중 get, post에 대하여
// get 메서드: 서버로부터 정보를 조회하기 위해 설계된 메서드
// post 메서드: 리소스를 생성/변경하기 위해 설계된 메서드


// 기존의 입력 값 불러오기
// 이 라우트는 절대주소로 localhost:3000/update/employee와 같이 나온다.
router.get("/employee", async (req, res) => {
    const emp_res = await selectSql.getEmployee();
    res.render("updateEmployee", {
        // 타이틀로 직원 테이블 갱신 이라는 문자열이 뜨고,
        title: "직원 테이블 갱신",
        // 그 아래 employee 테이블이 뜨게 된다.
        emp_res
    });
});

// 기존의 입력 값 불러오기
router.get("/department", async(req, res) => {
    // 이 dept_res가 updateDepartment.hbs에서 호출되어 사용된다.
    const dept_res = await selectSql.getDepartment();
    res.render("updateDepartment", {
        // 타이틀로 부서 테이블 갱신 이라는 문자열이 뜨고,
        title: "부서 테이블 갱신",
        // 그 아래 department 테이블이 뜨게 된다.
        dept_res
    });
});

// 수정 버튼을 눌렀을 경우 update query를 실행하며 조회 페이지로 이동
router.post("/employee", async (req, res) => {
    const vars = req.body;
    const data = {
        Salary: vars.salary
    }
    await updateSql.updateEmployee(data);

    res.redirect("/select");
});

// 수정 버튼을 눌렀을 경우 update query를 실행하며 조회 페이지로 이동
router.post("/department", async (req, res) => {
    const vars = req.body;
    // 값이 제대로 넘어왔는지 console.log를 통해 찍어본다.
    console.log(vars.dname);

    const data = {
        Dname: vars.dname
    }
    await updateSql.updateDepartment(data);

    // 절대 경로 localhost:3000/select
    res.redirect("/select");
});

module.exports = router;