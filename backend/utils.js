const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("./key");
const jwt = require("jsonwebtoken");

function generateAccessToken(data) {
  return jwt.sign(data, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

function generateRefreshToken(data) {
  const refreshToken = jwt.sign(data, REFRESH_TOKEN_SECRET);
  return refreshToken;
}

const authentication = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token is invalid or expired
    }

    // Attach the user information to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};

const verifyRefreshToken = (token) => {
  try {
    const user = jwt.verify(token, REFRESH_TOKEN_SECRET);

    const accessToken = generateAccessToken({ email: user.email });
    return accessToken;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  authentication,
  verifyRefreshToken,
};
