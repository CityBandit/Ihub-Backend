authRouter = require("express").Router();
const {
  Register,
  login,
  forgotPassword,
  VerifyResetToken,
  resetPassword,
  generateTokenPairs,
} = require("../controllers/auth");
const { verifyRefreshToken } = require("../helpers/getJwt");

authRouter.post("/auth/register", Register);
authRouter.post("/auth/login", login);
authRouter.get("/auth/refresh",verifyRefreshToken, generateTokenPairs);
authRouter.post("/auth/forget-password", forgotPassword);
authRouter.get("/auth/reset-password", VerifyResetToken);
authRouter.post("/auth/reset-password", resetPassword);

module.exports = { authRouter };
