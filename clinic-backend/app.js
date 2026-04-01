const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { PORT, MONGODB_URI, ALLOWED_ORIGINS } = require("./config");
const routes = require("./src/routers");
const errorHandler = require("./src/middlewares/error-handler");

const app = express();

const corsOptions = ALLOWED_ORIGINS;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);
app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
