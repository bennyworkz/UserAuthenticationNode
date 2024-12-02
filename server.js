const express = require('express');
const connectDB = require('./config/connectDB');
const userController = require('./API/userControllers');

require('dotenv').config()

const app = express();
app.use(express.json());

app.use("/user", userController );


const PORT = process.env.PORT;
connectDB().then(()=>{
    app.listen(PORT, () =>{
        console.log("Server is running on the port " + PORT);
    });
});
