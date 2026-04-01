const ApiError = (status, message, errors = []) => {
  const error = new Error(message);
  error.status = status;
  error.errors = errors;

  return error;
};

const unauthorized = (message = "User is not authorized") => {
  return ApiError(401, message);
};

const badRequest = (message, errors = []) => {
  return ApiError(400, message, errors);
};

const notFound = (message) => {
  return ApiError(404, message);
};

module.exports = {
  ApiError,
  unauthorized,
  badRequest,
  notFound,
};