const { verifyAccessToken } = require("../services/tokens");
const { unauthorized } = require("../exceptions/api-error");
const userDto = require("../dto/user-dto");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(unauthorized());
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(unauthorized());
    }

    const user = verifyAccessToken(token);

    if (!user) {
      return next(unauthorized());
    }

    req.user = userDto(user);

    next();
  } catch (error) {
    next(unauthorized());
  }
};

module.exports = authMiddleware;
