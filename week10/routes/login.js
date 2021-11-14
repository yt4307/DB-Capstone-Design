 // Copyright 2021 kms
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

// async가 반드시 있어야 await를 쓸 수 있다.
router.post('/', async (req, res) => {
    const vars = req.body;

    // 데이터베이스에서 유저 정보를 가져온다.
    const users = await selectSql.getUsers();
    // 나중에 값을 수정해야 되므로 변수 선언시 const가 아닌 let를 사용하여 변수를 선언한다.
    let whoAmI = "";
    let checkLogin = false;
    
    // for문으로 user에 하나 하나 값을 집어넣을 수도 있겠지만
    // 모던 JS에서는 map을 이용해 값을 집어넣는다.
    users.map((user) => {
        console.log(user.Id);
        // 우리가 입력한 id와 데이터베이스에 있는 Id가 같은지,
        // 우리가 입력한 password가 데이터베이스에 있는 Password와 같은지
        if (vars.id === user.Id && vars.password === user.Password) {
            console.log("login success!");
            checkLogin = true;
            // 입력된 id가 관리자 계정이라면
            if (vars.id === "admin") {
                whoAmI = "admin";
            }
            else {
                whoAmI = "users";
            }
        }
    })

    // checkLogin의 값이 true이고, whoAmI의 값이 admin이라면
    if (checkLogin && whoAmI === "admin") {
        // /delete 경로로 보낸다.
        res.redirect("/delete");
    }
    // 마찬가지로 users라면 /select 경로로 보내고,
    else if (checkLogin && whoAmI === "users") {
        res.redirect("/select");
    }
    // 둘 다 아니라면 로그인 실패로 간주하여 에러메세지 출력
    else {
        console.log("login failed!");
        res.send("<script>alert('로그인에 실패했습니다.'); location.href='/';</script>");
    }
})

module.exports = router;