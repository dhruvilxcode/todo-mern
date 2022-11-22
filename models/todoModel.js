import { Schema, Model } from "mongoose";

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    tasks: [String]
})

const TodoModel = Model('todo', TodoSchema)

export default TodoModel;