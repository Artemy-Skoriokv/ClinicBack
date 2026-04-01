const mongoose = require("mongoose");
const { Schema } = mongoose;

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Doctors", doctorSchema);