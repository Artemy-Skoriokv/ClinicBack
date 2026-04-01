const bcrypt = require("bcryptjs");
const User = require("../models/user");
const {
  generateTokens,
  saveRefreshToken,
} = require("./tokens");
const { badRequest } = require("../exceptions/api-error");
const userDto = require("../dto/user-dto");

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

module.exports = {
  register
};