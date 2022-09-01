const express = require("express");
const connectDB = require("./config/db");
const app = express();
const authRoute = require("./routes/auth.routes");
const postRoute = require("./routes/post.routes");

// Connect Database
connectDB();

// Init Middleware
// app.use(express.json());
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb'}));


app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
