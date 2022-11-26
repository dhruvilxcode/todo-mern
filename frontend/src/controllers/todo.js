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