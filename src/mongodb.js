const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/LoginSignUp")
  .then(() => {
    console.log("mongodb connection successful");
  })
  .catch(() => {
    console.log("mongodb connection failed");
  });

const LogInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("collection1", LogInSchema);

module.exports = collection;
