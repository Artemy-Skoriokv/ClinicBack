const mongoose = require("mongoose");
const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("RefreshTokens", refreshTokenSchema);