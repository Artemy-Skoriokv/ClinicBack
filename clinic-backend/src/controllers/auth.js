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

const userLogin = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.userLogin(
      login,
      password,
    );

    res.cookie("refreshToken", refreshToken, refreshTokenOpions);
    res.cookie("accessToken", accessToken, accessTokenOpions);

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    const removeToken = await authService.logout(refreshToken);

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    return res.json(removeToken);
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const tokenFromCookie = req.cookies.refreshToken;

    const tokens = await authService.refresh(tokenFromCookie);

    res.cookie("refreshToken", tokens.refreshToken, refreshTokenOpions);
    res.cookie("accessToken", tokens.accessToken, accessTokenOpions);

    return res.json(tokens);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, userLogin, logout, refresh };
