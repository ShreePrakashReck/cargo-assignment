const express = require("express");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/database");
const dotenv = require("dotenv");
const user = require("./routes/user");
const cors = require("cors");

dotenv.config("./.env");
const app = express();
//middleware
//cookies parse middleware
app.use(cookieParser());
//bodyparser middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/v1", user);

//default Route
app.get("/default", (req, res) => {
  res.send("You have to created successfully default route");
});

//dbconnection
dbConnect();
const PORT = process.env.PORT || 4000;

//listen server
app.listen(PORT, (req, res) => {
  console.log(`App is listening on ${PORT}`);
});
