const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/users");
const batchRoutes = require("./routes/batch");
const authentication = require("./middlewares/auth");
const pool = require("./db");

// Un-Authenticated Routes
app.use("/batch", batchRoutes);

// Authenticated Routes
// app.use(authentication.authUsers);

app.use(userRoutes);

app.listen(4000, "0.0.0.0", () => {
  console.log(`Server Started at PORT: 4000`);
});
