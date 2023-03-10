const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://admin-Ksp:mongokamango@cluster0.1sdncgz.mongodb.net/netflix", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

// static files
app.use(express.static(path.join(__dirname, "../netflix-ui/build")));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, "../netflix-ui/build/index.html"));
});

app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log("server started on port 5000");
});