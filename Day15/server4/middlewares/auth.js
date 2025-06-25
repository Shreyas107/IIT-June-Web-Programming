const { SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");

const authUsers = (request, response, next) => {
  if (request.url === "/user/login" || request.url === "/user/register") {
    // skipping authentication
    return next();
  }

  const token = request.headers.token;

  console.log("token: ", token);

  if (!token) {
    return response.status(403).json({ message: "Token is required" });
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);

    console.log("payload:", payload);
    // If token is valid, add the user object to the request for further use
    request.user = payload;

    next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = {
  authUsers,
};
