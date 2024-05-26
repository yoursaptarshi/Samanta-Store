const express = require("express");
const productRoute = require("./routes/productRoute")
const userRoute = require('./routes/userRoutes')
const orderRoute = require("./routes/orderRoute")
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/api/v1",productRoute);
app.use("/api/v1",userRoute);
app.use("/api/v1",orderRoute)
module.exports = app;