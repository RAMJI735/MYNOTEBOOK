const jwt = require("jsonwebtoken");
require('dotenv').config()
const JWT_SECRET = process.env.SECRET;

const userVerification = (req, res, next) => {
    let token = req.header("auth-token");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "please login" });
    }
    try {
      let isVerify = jwt.verify(token, JWT_SECRET);
      req.user = isVerify.id;
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error:error
      });
    }
  }

  module.exports = userVerification;