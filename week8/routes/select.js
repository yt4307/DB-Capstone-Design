// 데이터베이스의 데이터 조회 구현
import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

// 여기서의 /는 절대경로 /가 아닌 상대경로 /이다.
// 따라서 여기서 /는 /select/를 가리킨다.
router.get('/', async (req, res) => {
    const employee = await selectSql.getEmployee();
    const department = await selectSql.getDepartment();

    res.render("select", {
        title: "직원 테이블",
        title2: "부서 테이블",
        employee,
        department
    });
});

module.exports = router;