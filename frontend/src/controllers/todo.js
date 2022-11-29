import { API } from "../config/backend";
import axios from "axios";
export const addTodo = async (title, task) =>{
    try {
        
        const resp = await axios.post(`${API}/todo/add`, {
            title: title,
            task: task
        })

        return resp;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const getAllTodos = async () =>{
    try {
        const resp = await axios.get(`${API}/todo/`);

        return resp;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteTodo = async (id) => {
    try {
        
        const resp = await axios.delete(`${API}/todo/${id}/delete`)

        return resp;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const addTask = async (id, task) => {
    try {
        
        const resp = await axios.post(`${API}/todo/${id}/tasks/add`, {
            title: task,
        })

        return resp;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const deleteTask = async (todoId, task) => {
    try {
        
        const resp = await axios.delete(`${API}/todo/${todoId}/tasks/delete?title=${task}`)

        return resp;

    } catch (error) {
        console.error(error);
        throw error;
    }
}