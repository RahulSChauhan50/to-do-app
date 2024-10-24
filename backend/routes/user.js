const router = require("express").Router();
const User = require("../model/user");
const {
  generateAccessToken,
  generateRefreshToken,
  authentication,
  verifyRefreshToken,
} = require("../utils");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let msg = "";
    if (
      !email ||
      email.trim().length == 0 ||
      password ||
      password.trim().length == 0
    ) {
      return res.status(400).json({
        status: false,
        message: "Email or password not provided",
      });
    }

    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const userCreate = new User({ email: email, password: hashedPassword });
      await userCreate.save();
      msg = "New user created successfully";
    } else {
      const isPasswordValid = await bcrypt.compare(
        password,
        userExists.password
      );

      if (!isPasswordValid) {
        return res.status(403).json({ message: "Invalid credentials" });
      }

      msg = "User found";
    }
    const refreshToken = generateRefreshToken({ email });
    const accessToken = generateAccessToken({ email });

    return res.status(201).json({
      status: true,
      message: msg,
      data: {
        refreshToken,
        accessToken,
      },
    });
  } catch (error) {
    console.log("error while login", error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    let msg = "access token generated";
    if (!refreshToken || refreshToken.trim().length == 0) {
      return res.status(400).json({
        status: false,
        message: "refresh token not provided",
      });
    }

    const accessToken = verifyRefreshToken(refreshToken);

    return res.status(201).json({
      status: true,
      message: msg,
      data: {
        accessToken,
      },
    });
  } catch (error) {
    console.log("error while generating access token", error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

module.exports = router;
