const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./router/router");
require("dotenv").config();
const app = express();
const port = 5000;
app.use(cors({
  origin:"*",
  credentials:false
}));
app.use(bodyParser.json());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({extended:true}))
app.use("/", router);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
