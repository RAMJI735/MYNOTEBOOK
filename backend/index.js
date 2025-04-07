const connectToDB = require("./database");
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT_NO;
const cors = require('cors');
const path = require('path');


connectToDB();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, '/public')));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/notes", require("./routes/notes.routes"));
app.use("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
