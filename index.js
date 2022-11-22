import dotenv from  "dotenv";
dotenv.config({});
import "./config/database";
import express from "express";


// routes import
import todoRoute from "./routes/todo";
// routes import


const app = express();


// middlewares
app.use(express.json())
// middlewares


// routes
app.use("/", todoRoute);
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