import express from "express";
import { selectSql, courseDeleteSql } from "../database/sql";

const router = express.Router();

// 기존의 입력 값 불러오기
router.get('/', async (req, res) => {
    const course = await selectSql.getCourse();
    
    res.render('deleteCourse', {
        title: "삭제기능",
        course
    });
});

// course 삭제
router.post('/', async (req, res) => {
    console.log("delete router:", req.body.courseDelBtn);

    const data = {
        Cname: req.body.courseDelBtn,
    };

    await courseDeleteSql.deleteCourse(data);

    // /delete 페이지 재호출
    res.redirect('/deletecourse'); // localhost:3000/delete
});

module.exports = router;