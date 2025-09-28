const mongoose = require("mongoose");

const uri = "mongodb+srv://sahand:sahandazin2012@cluster0.lad49kl.mongodb.net/";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = mongoose;
