require('dotenv').config()

const express=require('express')
const { json, urlencoded } = require("body-parser");
const port = process.env.PORT || 3000
const app = express()
const cors = require("cors");

var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

// Routes

const { AuthRoutes, ImageRoutes } = require("./routes");

app.use("/api/auth", AuthRoutes);
app.use("/api/image", ImageRoutes);

app.listen(port, (req,res)=>{
  console.info(`Running on ${port}`)
})