const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all batches
// http://localhost:4000/
// endpoint -> /batch/all
router.get("/all", (request, response) => {
  const sql = `SELECT 
        b.batch_id, b.batch_name, c.course_name, b.start_date, 
        b.end_date, b.duration, b.fees, b.mode, b.location, b.time_slot,
        c.course_id, c.description
        FROM course_batches b
        INNER JOIN courses c ON b.course_id = c.course_id
    `;

  pool.query(sql, (error, results) => {
    if (error) {
      return response.send(error);
    }

    if (results.length === 0) {
      return response.send("No Batch Found...");
    }

    return response.send({
      status: "success",
      results,
    });
  });
});

// GET a batch details by batchID
// http://localhost:4000/
// endpoint -> /batch/all
router.get("/id/:batchId", (request, response) => {
  // const batchId = request.params.batchId
  const sql = `SELECT 
        b.batch_id, b.batch_name, c.course_name, b.start_date, 
        b.end_date, b.duration, b.fees, b.mode, b.location, b.time_slot,
        c.course_id, c.description
        FROM course_batches b
        INNER JOIN courses c ON b.course_id = c.course_id
        WHERE batch_id = ?
    `;

  pool.query(sql, [request.params.batchId], (error, results) => {
    if (error) {
      return response.send({
        status: "error",
        error,
      });
    }

    if (results.length === 0) {
      return response.send({
        status: "success",
        message: `No batch found by ID: ${request.params.batchId}`,
      });
    }

    return response.send({
      status: "success",
      batch: results,
    });
  });
});

// POST create a new batch
// http://localhost:4000/batch
router.post("/add", (request, response) => {
  const {
    courseId,
    batchName,
    startDate,
    endDate,
    timeSlot,
    duration,
    fees,
    mode,
    location,
  } = request.body;

  const sql = `INSERT INTO course_batches
        (course_id, batch_name, start_date, end_date, 
        time_slot, duration, fees, mode, location)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  pool.query(
    sql,
    [
      courseId,
      batchName,
      startDate,
      endDate,
      timeSlot,
      duration,
      fees,
      mode,
      location,
    ],
    (error, result) => {
      if (error) {
        return response.send({
          status: "error",
          error,
        });
      }

      return response.send({
        status: "success",
        message: "Batch added Successfully...",
        result,
      });
    }
  );
});

// PUT update a batch by its batch_id
router.put("/update/:batchId", (request, response) => {
  const {
    courseId,
    batchName,
    startDate,
    endDate,
    timeSlot,
    duration,
    fees,
    mode,
    location,
  } = request.body;

  const batchId = request.params.batchId;

  const sql = `UPDATE course_batches
        SET course_id = ?, batch_name = ?, 
        start_date = ?, end_date = ?, 
        time_slot = ?, duration = ?, fees = ?, mode = ?, location = ?
        WHERE batch_id = ?
       `;

  pool.query(
    sql,
    [
      courseId,
      batchName,
      startDate,
      endDate,
      timeSlot,
      duration,
      fees,
      mode,
      location,
      batchId,
    ],
    (error, result) => {
      if (error) {
        return response.send({
          status: "error",
          error,
        });
      }

      if (result.affectedRows === 0) {
        return response.send({
          status: "success",
          message: `No Batch Found with ID: ${batchId}`,
          result,
        });
      }

      return response.send({
        status: "success",
        message: `Batch updated Successfully...`,
        result,
      });
    }
  );
});

// DELETE delete a batch by its batch_id
router.delete("/delete/:batchId", (request, response) => {
  const { batchId } = request.params;

  const sql = `DELETE FROM course_batches
            WHERE batch_id = ?`;

  pool.query(sql, [batchId], (error, result) => {
    if (error) {
      return response.send({
        status: "error",
        error,
      });
    }

    if (result.affectedRows === 0) {
      return response.send({
        status: "success",
        message: `No Batch Found with ID: ${batchId}`,
        result,
      });
    }

    return response.send({
      status: "success",
      message: `Batch deleted Successfully...`,
      result,
    });
  });
});

module.exports = router;
