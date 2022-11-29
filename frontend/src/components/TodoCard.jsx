import React from 'react'
import { toast } from 'react-toastify';
import { deleteTask } from "../controllers/todo";
const TodoCard = ({title, tasks, todoId, onBtnTodoDelete, onBtnAddTask}) => {
  const onBtnDeleteTask = (task) => {
    try {
      deleteTask(todoId, task)
      .then(resp=>{
        if(resp.status === 201) {
          window.location.reload();
        }
      })
      .catch(e=>{
        console.log(e);
        toast.error("Can't delete task right now, try again later!");
      })
    } catch (error) {
      toast.error("Something went wrong while removing task");
      console.error(error);
    }
    
  }

  return (
    <div className="card bg-base-100 shadow-xl mb-6">
      <div className="card-body">
      <p className="card-title"> 
      {title}
      <button className="btn btn-circle btn-ghost btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z"/></svg>
      </button>
      <button className="btn btn-circle btn-ghost btn-sm" onClick={onBtnTodoDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z"/></svg>
      </button>
      </p>
      
      {
        tasks.length > 0?
        <ul>
          {tasks.map(task=>(
            <li key={task} className="px-2 py-3 cursor-pointer hover:bg-slate-100 rounded-lg flex items-center justify-between">
              <div>{task}</div>
              <div>
                <button className="btn btn-circle btn-ghost btn-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z"/></svg>
                </button>
                <button className="btn btn-circle btn-ghost btn-sm" onClick={()=>{
                  onBtnDeleteTask(task);
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z"/></svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
        : <></>
      }

      <button className="btn btn-ghost" onClick={onBtnAddTask}>+ Add more task</button>
      </div>
  </div>
  )
}

export default TodoCard