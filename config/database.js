const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongoodb database is Connected ${connect.connection.host}`);
  } catch (error) {
    console.log("Error message : ", error.message);
    process.exit(1);
  }
};

//ACugjzZtTdmwVpyb
