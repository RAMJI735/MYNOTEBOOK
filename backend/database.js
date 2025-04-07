const { default: mongoose } = require("mongoose");
require("dotenv").config();
const connectToDB = () => {
  mongoose.connect(process.env.DB_URL)
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectToDB;
