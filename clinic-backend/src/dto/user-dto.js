const userDto = (user) => ({
  id: user._id,
  login: user.login,
});

module.exports = userDto;