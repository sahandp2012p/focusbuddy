const mongoose = require("../db");
const Schema = mongoose.Schema;

// Define the User schema
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Export the model
module.exports = mongoose.model("User", UserSchema);
