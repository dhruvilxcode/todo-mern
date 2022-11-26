require("dotenv").config({})
require("./config/database.js");
const express = require("express");


// routes import
const todoRoute = require("./routes/todo");
// routes import


const app = express();


// middlewares
app.use(express.json())
// middlewares


// routes
app.use("/todo", todoRoute);
// routes


app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Welcome to Todo App",
    });
})


// listen on port
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`Server is running on the port ${PORT}`);
})