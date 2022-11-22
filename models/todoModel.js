const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    tasks: [String]
})

const TodoModel = mongoose.model('todo', TodoSchema)

module.exports = TodoModel;