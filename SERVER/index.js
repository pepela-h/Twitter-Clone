require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const corsConfig = require("./config/corsOptions");
const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT || 3500;
const dbConn = (url) => {
  console.info("Trying to connect to " + url);
  try {
    mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log(error);
  }
};

dbConn(DB_URI);

app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json({ extended: true, limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.url,);
  next();
});

app.get("/", (req, res) => {
  res.send("This is homepage");
});

app.use("/posts", require("./routes/posts"))
app.use("/users", require("./routes/users"))
app.use("/refresh", require("./routes/refresh"))

mongoose.connection.once("connected", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
  });
});
