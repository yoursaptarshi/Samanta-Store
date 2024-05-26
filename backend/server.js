const app = require("./app");
const dotenv = require('dotenv');
const {connectDB} = require('./config/database')


//config
dotenv.config({path:"./config/config.env"})

const PORT = process.env.PORT;


connectDB();
app.listen(PORT,()=>{
    console.log(`Server is running on PORT:${PORT}`)
})