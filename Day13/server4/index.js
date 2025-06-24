const express = require("express");

const app = express();
app.use(express.json());

const userRoutes = require("./routes/users");
const authentication = require("./middlewares/auth");

app.use(authentication.authUsers);

app.use(userRoutes);

app.listen(4000, () => {
  console.log(`Server Started at PORT: 4000`);
});
