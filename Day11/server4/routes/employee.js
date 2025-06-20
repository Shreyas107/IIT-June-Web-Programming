const express = require("express");
const router = express.Router();
// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "shreyas",
//   database: "test",
// });

const pool = require("../db");

// http://127.0.0.1:4000/emp/all-employees
router.get("/all-employees", (request, response) => {
  pool.query("SELECT * FROM employee", (error, results) => {
    if (error) {
      return response.send("ERROR: ", error);
    }

    return response.send(results);
  });
});

// Add new employee
router.post("/add", (request, response) => {
  console.log("request: ", request.url);
  console.log("request: ", request.body);

  const { empName, empEmail } = request.body;

  pool.execute(
    "insert into employee (name, email) values (?,?)",
    [empName, empEmail],
    (error, result) => {
      if (error) {
        return response.send(error);
      }

      return response.send("Employee inserted successfully...");
    }
  );
});

// update an employee by its id
router.put("/update/:empId", (request, response) => {
  const { empId } = request.params;
  const { salary } = request.body;

  const sql = `update employee set salary = ? where id = ?`;

  pool.query(sql, [salary, empId], (error, result) => {
    if (error) {
      return response.send(error);
    }

    if (result.affectedRows === 0) {
      return response.send("Employee not found");
    }

    // return response.send(result);
    return response.send("Employee updated successfully");
  });
});

// delete an employee by id
router.delete("/remove/:empId", (request, response) => {
  const { empId } = request.params;

  const sql = `delete from employee where id = ?`;

  pool.query(sql, [empId], (error, result) => {
    if (error) {
      return response.send(error);
    }

    if (result.affectedRows === 0) {
      return response.send("Employee not found");
    }

    return response.send("Employee deleted successfully...");
  });
});

router.get("/employee/:empId", (request, response) => {
  const empId = request.params.empId;
  //   console.log("request.url: " + request.url);

  console.log("empId: " + empId);

  pool.query(
    "SELECT * FROM employee WHERE id = ?",
    [empId],
    (error, results) => {
      if (error) {
        return response.send(`ERROR: ${error}`);
      }

      if (results.length === 0) {
        // return response.send("Empoyee does not exits with this id: " + empId);
        return response.send(`Empoyee does not exits with this id:  ${empId}`);
      }

      return response.send(results);
    }
  );
});

// request object
// body: POST, PUT
// params: GET, PUT, DELETE
// query: GET, PUT, DELETE
// url:
// headers
//

module.exports = router;
