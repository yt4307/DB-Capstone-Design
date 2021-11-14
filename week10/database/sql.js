import mysql from "mysql2";
//import Query from "mysql2/typings/mysql/lib/protocol/sequences/Query";

// 데이터베이스 연결
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'week10',
    password: 'yt1578426!@%',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

// async / await 사용
const promisePool = pool.promise();

// select query
export const selectSql = {
  // rows 배열을 만들어서 select로 받아온 user정보를 넣어준다.
  getUsers : async () => {
    const [rows] = await promisePool.query(`select * from user`);
    console.log(rows)
    return rows
  },
  // 마찬가지로 rows 배열에 department 정보들을 담아 반환해준다.
  getDepartment : async () => {
    const [rows] = await promisePool.query(`select * from department`);

    return rows
  },

  getCourse : async () => {
    const [rows] = await promisePool.query(`select * from course`);
    
    return rows;
  }
}

//delete query
export const deleteSql = {
  deleteDepartment : async (data) => {
    console.log("deleteSql.deleteDepartment:", data.Dnumber);
    // sql문을 사용해 Dnumber에 해당하는 튜플을 지운다.
    const sql = `delete from department where Dnumber=${data.Dnumber}`;

    await promisePool.query(sql);
  },
}

// course 삭제 쿼리
export const courseDeleteSql = {
  deleteCourse: async (data) => {
    console.log("courseDeleteSql.deleteCourse:", data.Cname);
    // sql문을 사용해 Cname에 해당하는 튜플을 지운다.
    const sql = `delete from course where Cname="${data.Cname}"`;

    await promisePool.query(sql);
  },
}