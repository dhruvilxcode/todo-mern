
const Todo = require("../models/todoModel");

exports.getTodos =  async (req, res)=>{
    try {
        const todos = await Todo.find({});

        res.status(200).json(todos);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Something went wrong while getting todo!"
        });
    }
};

exports.addTodo =  async (req, res)=>{
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
};

exports.updateTodo =  async (req, res)=>{
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
}

exports.deleteTodo = async (req, res)=>{
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
};

exports.addTask =  async (req, res)=>{
    const { title } = req.body;
    const { id } = req.params;

    if(!title) {
        res.status(400).json({
            message: "Please provide required parameter Task 'Title'",
        });
    }

    try {
        
        const todo = await Todo.findOne({
            _id: id
        });

        if(!todo) {
            return res.status(400).json({
                message: "Todo not found!"
            });
        }

        todo.tasks.push(title);
        const savedTodo = await todo.save();

        res.status(201).json({
            message: "Task Added.",
            data: savedTodo
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Something went wrong while saving Task!"
        });
    }
};

exports.getAllTasks =  async (req, res)=>{
    const { id } = req.params;
    try {
        
        const todo = await Todo.findOne({
            _id: id
        });

        if(!todo) {
            return res.status(400).json({
                message: "Todo not found!"
            });
        }

        res.status(201).json(todo.tasks);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Something went wrong while getting Task!"
        });
    }
};

exports.deleteTask = async (req, res)=>{
    const { id } = req.params;
    const { title } = req.body;
    
    if(!title) {
        return res.status(400).json({
            message: "Please provide task title to remove!"
        });
    }

    try {
        
        const todo = await Todo.findOne({
            _id: id
        });

        if(!todo) {
            return res.status(400).json({
                message: "Todo not found!"
            });
        }

        todo.tasks = todo.tasks.filter(task => task !== title);
        await todo.save();

        res.status(201).json({
            message: "Task removed"
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Something went wrong while deleting Task!"
        });
    }
};

exports.updateTask = async (req, res)=>{
    const { id } = req.params;
    const { title, newTitle } = req.body;
    
    if(!title) {
        return res.status(400).json({
            message: "Please provide task title to update!"
        });
    }

    if(!newTitle) {
        return res.status(400).json({
            message: "Please provide new task title to update with!"
        });
    }

    try {
        
        const todo = await Todo.findOne({
            _id: id
        });

        if(!todo) {
            return res.status(400).json({
                message: "Todo not found!"
            });
        }

        
        const index = todo.tasks.indexOf(title);
        
        // if task is not in the DB.
        if(index === -1) {
            return res.status(400).json({
                message: "Task not found!"
            });
        }

        // update task
        todo.tasks[index] = newTitle;

        const newTodo = await todo.save();

        res.status(201).json({
            message: "Task updated",
            data: newTodo
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Something went wrong while updating Task!"
        });
    }
};