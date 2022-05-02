const mongoose = require("mongoose");
const connectDB = (url) => {
  console.info(`Trying to connect to ${url}...`);
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: "pepela",
      user: "pepela",
      pass: "1034Vgsu",
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
