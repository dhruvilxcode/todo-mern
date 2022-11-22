const { Router } = require("express");
const Todo = require("../models/todoModel");
const router = Router();

// get all todos
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

// create todo
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

// update todo
router.put("/:id/update", async (req, res)=>{
    const { id } = req.params;
    const { title } = req.body;

    if(!(id && title)) {
        return res.status(400).json({
            message: "Provide todo id, title to update!"
        });
    }

    try {

        await Todo.findOneAndUpdate({_id: id}, {
            title
        });

        res.status(200).json({
            message: "Todo updated!",
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Something went wrong while updating todo!"
        });
    }
})


// delete todo
router.delete("/:id/delete", async (req, res)=>{
    const { id } = req.params;

    if(!id) {
        return res.status(400).json({
            message: "Provide todo id to delete!"
        });
    }

    try {

        await Todo.findOneAndDelete({_id: id});

        res.status(200).json({
            message: "Todo Deleted!",
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Something went wrong while deleting todo!"
        });
    }
})


module.exports = router;