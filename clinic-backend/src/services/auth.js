const bcrypt = require("bcryptjs");
const User = require("../models/user");
const {
  generateTokens,
  saveRefreshToken,
  verifyRefreshToken,
} = require("./tokens");
const { badRequest, unauthorized } = require("../exceptions/api-error");
const userDto = require("../dto/user-dto");
const RefreshToken = require("../models/refresh-token");

const register = async (login, password) => {
  const existingUser = await User.findOne({ login });
  if (existingUser) {
    throw badRequest("user with name exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    login,
    password: hashedPassword,
  });

  await user.save();

  const userData = userDto(user);
  const tokens = generateTokens({ userId: user._id, login: user.login });
  await saveRefreshToken(tokens.refreshToken, user._id);

  return {
    user: userData,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
};

const userLogin = async (login, password) => {
  const user = await User.findOne({ login });

  if (!user) {
    throw badRequest("Invalid login or password");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw badRequest("Invalid login or password");
  }

  const userData = userDto(user);
  const tokens = generateTokens({ userId: user._id, login: user.login });
  await saveRefreshToken(tokens.refreshToken, user._id);

  return {
    user: userData,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
};

const logout = async (refreshToken) => {
  const removedToken = await RefreshToken.deleteOne({ token: refreshToken });
  return removedToken;
};

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw unauthorized();
  }

  const userData = verifyRefreshToken(refreshToken);

  const token = await RefreshToken.findOne({
    token: refreshToken,
  });

  if (!token || !userData) {
    throw unauthorized();
  }

  const user = await User.findById(userData.userId);

  const tokens = generateTokens({
    userId: userData.userId,
    login: userData.login,
  });
  await saveRefreshToken(tokens.refreshToken, user._id);

  return tokens;
};

module.exports = {
  register,
  userLogin,
  logout,
  refresh,
};