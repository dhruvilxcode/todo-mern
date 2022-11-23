const { Router } = require("express");
const Todo = require("../models/todoModel");

const { getTodos, addTodo, updateTodo, deleteTodo, addTask, getAllTasks, deleteTask, updateTask } = require("../controllers/todoController")

const router = Router();

// get all todos
router.get("/", getTodos)

// create todo
router.post("/add", addTodo)

// update todo
router.put("/:id/update", updateTodo)


// delete todo
router.delete("/:id/delete", deleteTodo)

// add tasks
router.post("/:id/tasks/add", addTask)

// read tasks
router.get("/:id/tasks/get", getAllTasks)

// delete task
router.delete("/:id/tasks/delete", deleteTask)

// update task
router.put("/:id/tasks/update", updateTask)

module.exports = router;