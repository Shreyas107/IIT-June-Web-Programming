const express = require("express");
const cors = require("cors");
const app = express();

// import employee apis into index.js
const empRoutes = require("./routes/employee");

app.use(express.json());
app.use(cors());

// http://127.0.0.1:4000/demo
// /demo -> endpoint / path
app.get("/demo", (request, response) => {
  response.send("demo route");
});

// http://127.0.0.1:4000/emp
app.use("/emp", empRoutes);

app.listen(4000, () => {
  console.log(`server started at port 4000`);
});

// npm install -g nodemon
// localhost == 127.0.0.1
