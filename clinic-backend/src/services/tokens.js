const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/refresh-token");
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require("../../config");

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_ACCESS_SECRET);
  } catch (error) {
    return null;
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (error) {
    return null;
  }
};

const saveRefreshToken = async (token, userId) => {
  const tokenData = await RefreshToken.findOne({ userId });

  if (tokenData) {
    tokenData.token = token;
    await tokenData.save();
    return tokenData;
  }
  const newToken = await RefreshToken.create({ userId, token });
  return newToken;
};

const removeRefreshToken = async (token) => {
  const removedRefreshToken = await RefreshToken.deleteOne({ token });
  return removedRefreshToken;
};

const findRefreshToken = async (token) => {
  const foundRefreshToken = await RefreshToken.findOne({ token });
  return foundRefreshToken;
};

module.exports = {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
  saveRefreshToken,
  removeRefreshToken,
  findRefreshToken,
};