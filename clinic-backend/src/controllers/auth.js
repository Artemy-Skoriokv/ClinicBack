const authService = require("../services/auth");

const refreshTokenOpions = {
  httpOnly: true,
  maxAge: 30 * 24 * 60 * 60 * 1000,
  sameSite: "lax",
};

const accessTokenOpions = {
  httpOnly: true,
  maxAge: 15 * 60 * 1000,
  sameSite: "lax",
};

const register = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.register(
      login,
      password,
    );

    res.cookie("refreshToken", refreshToken, refreshTokenOpions);
    res.cookie("accessToken", accessToken, accessTokenOpions);

    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = { register };
