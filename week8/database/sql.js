import mysql from "mysql2";

// 데이터베이스 연결
const pool = mysql.createPool(
    process.env.JAWSDB_URL ?? {
        host: "localhost",
        user: "root",
        database: "week8",
        password: "yt1578426!@%",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);

// async / await 사용
// 동기 프로그래밍
const promisePool = pool.promise();

// select query
// 한번에 서로 다른 두가지 테이블을 조회
export const selectSql = {
    getEmployee : async () => {
        const [rows] = await promisePool.query(`select * from employee`);
        console.log(rows);
        return rows;
    },
    getDepartment : async () => {
        const [rows] = await promisePool.query(`select * from department`);

        return rows;
    }
}

// insert query
// 따로 값을 리턴하지는 않지만 데이터를 받아와 데이터베이스에 집어넣는 역할
// home.js에서 만들어 post로 보낸 데이터를 매개변수로 넘겨받아 사용한다. 
export const insertSql = {
    //data라는 객체 타입의 파라미터에 입력할 정보를 받아서 query문 생성
    setEmployee : async (data) => {
        // 백틱(`)을 사용해 쿼리문을 입력받는다.
        // `을 써야만 문자열 안에 변수를 쓸 수 있음
        const sql = `insert into employee values (
            "${data.Fname}", "${data.Minit}", "${data.Lname}", "${data.Ssn}", "${data.Bdate}",
            "${data.Address}", "${data.Sex}", "${data.Salary}", "${data.Super_ssn}", "${data.Dno}" )`;
            
            // 쿼리함수를 통해 위에서 만들었던 쿼리문을 실행한다.
            // insert문이기 때문에 따로 돌려주는 값은 없음.
            await promisePool.query(sql);
    },

    setDepartment : async (data) => {
        const sql = `insert into department value (
            "${data.Dname}", "${data.Dnumber}", "${data.Mgr_ssn}", "${data.Mgr_start_date}" )`;

            await promisePool.query(sql);
    }
}

// update query
// updateSql 객체 안에 updateEmployee, updateDepartment 메서드가 있다.
// 따라서 update.js에서 해당 메서드들을 호출하여 사용할 수 있다.
export const updateSql = {
    // 매개변수로 data값을 가져오게 수정함
    updateEmployee : async (data) => {
        // where 조건을 만족하는 행에 대해서 salary 수정
        // Salary값을 입력받아 where의 조건에 따라 그 값으로 변경해주는 쿼리문
        const sql = `update employee set Salary = "${data.Salary}" where Ssn <= 12345678`;
        await promisePool.query(sql);
    },
    updateDepartment : async (data) => {
        // 위에선 상수 500을 사용했지만 여기선 변수를 사용하여 조건을 설정하도록 하였다.
        // where 절로 Dnumber가 10 미만일 때 값을 업데이트 하도록 수정해주었다.
        const sql = `update department set Dname = "${data.Dname}" where Dnumber < 10`;
        await promisePool.query(sql);
    }
}