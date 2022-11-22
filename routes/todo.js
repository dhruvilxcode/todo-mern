const { Router } = require("express");
const Todo = require("../models/todoModel");
const router = Router();

router.get("/", async (req, res)=>{
    try {
        const todos = await Todo.find({});

        res.status(200).json(todos);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Something went wrong while getting todo!"
        });
    }
})

router.post("/add", async (req, res)=>{
    const { title } = req.body;

    if(!title) {
        res.status(400).json({
            message: "Please provide required parameter 'Title'",
        });
    }

    try {
        const todo = new Todo({
            title
        });

        const savedTodo = await todo.save();

        res.status(201).json({
            message: "Todo Saved.",
            data: savedTodo
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Something went wrong while saving todo!"
        });
    }
})

module.exports = router;