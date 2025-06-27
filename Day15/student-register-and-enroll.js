router.post("/register-and-enroll", (request, response) => {
  let {
    email,

    firstName,
    middleName,
    lastName,
    gender,
    dateOfBirth,
    mobileNo,
    city,
    permanentAddress,
    pincode,
    state,

    academicYear,
    collegeName,

    isLaptopAvailable,
    batchId,
  } = request.body;

  const password = "1234"; // default password

  console.log("request.body: ", request.body);

  // Step 1: Validate Required Fields
  if (
    !email ||
    !password ||
    !firstName ||
    !middleName ||
    !lastName ||
    !gender ||
    !dateOfBirth ||
    !mobileNo ||
    !city ||
    !permanentAddress ||
    !pincode ||
    !state ||
    !collegeName ||
    !academicYear ||
    !isLaptopAvailable ||
    !batchId
  ) {
    return response.send(createErrorResponse("All fields are required!"));
  }

  if (isLaptopAvailable === "Yes") {
    isLaptopAvailable = 1;
  } else {
    isLaptopAvailable = 0;
  }

  // Step 2: Register User (Insert into User Table)
  const hashedPassword = bcrypt.hashSync(password, 10);
  const userSql = `INSERT INTO ${USER_TABLE} (email, password) VALUES (?, ?)`;

  db.query(userSql, [email, hashedPassword], (error, result) => {
    if (error?.code === "ER_DUP_ENTRY")
      return response.send(createErrorResponse("Email Taken Already!"));
    if (error)
      return response.send(
        createErrorResponse("Something went wrong while registering user!")
      );

    const userId = result.insertId; // Get the user ID

    // Step 3: Register Student (Insert into Student Table)
    const studentSql = `INSERT INTO ${STUDENT_TABLE} 
    (user_id, first_name, middle_name, last_name, gender, date_of_birth, mobile_no, city, permanent_address, pincode, state, college_name, academic_year, is_laptop_available)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      studentSql,
      [
        userId,
        firstName,
        middleName,
        lastName,
        gender,
        dateOfBirth,
        mobileNo,
        city,
        permanentAddress,
        pincode,
        state,
        collegeName,
        academicYear,
        isLaptopAvailable,
      ],
      (error, result) => {
        if (error) {
          console.log("error: ", error);

          return response.send(
            createErrorResponse("Error registering student")
          );
        }

        const studentId = result.insertId; // Get the student ID

        // Step 4: Enroll Student into Course (Insert into Enrollments Table)
        const enrollSql = `INSERT INTO ${ENROLL_TABLE} (student_id, batch_id) VALUES (?, ?)`;

        db.query(enrollSql, [studentId, batchId], (error, result) => {
          if (error)
            return response.send(
              createErrorResponse("Error enrolling student", error)
            );

          return response.send(
            createSuccessResponse(
              "Student registered and enrolled successfully!"
            )
          );
        });
      }
    );
  });
});
