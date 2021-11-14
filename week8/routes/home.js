// 데이터베이스에 데이터 삽입 구현
import express from "express";
// 사용자가 만든 모듈을 가져올 때는 중괄호를 써서 가져온다.
import { insertSql, selectSql } from "../database/sql";

const router = express.Router();

router.get('/', (req, res) => {
    // home.hbs를 찾아서 렌더링 하겠다.
    res.render("home"); // <= home.hbs를 의미함
});

router.post('/', (req, res) => {
    const vars = req.body;
    const var_length = Object.keys(req.body).length;

    if (var_length > 4) {
        const data = {
            Fname: vars.fname,
            Minit: vars.minit,
            Lname: vars.lname,
            Ssn: vars.ssn,
            Bdate: vars.bdate,
            Address: vars.Aaddress,
            Sex: vars.sex,
            Salary: vars.salary,
            Super_ssn: vars.super_ssn,
            Dno: vars.dno
        };

        insertSql.setEmployee(data);
    }
    else {
        const data = {
            Dname: vars.dname,
            Dnumber: vars.dnumber,
            Mgr_ssn: vars.mgr_ssn,
            Mgr_start_date: vars.mgr_start_date
        };

        insertSql.setDepartment(data);
    }
    res.redirect('/'); // /페이지를 다시 불러오겠다 => 원래도 /에 있었으니 사실상 페이지 새로고침
})

module.exports = router;