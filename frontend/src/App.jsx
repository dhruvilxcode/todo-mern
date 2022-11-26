import React from "react";


import FabAdd from "./components/fabAdd";
import { createRef } from "react";
import { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addTodo } from "./controllers/todo";

const App = () => {

  const [state, setState] = useState({
    todoTitle: "",
    todoFirstTask: ""
  })

  const { todoTitle, todoFirstTask } = state

  const handleChange = e =>{
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const modalCloseBtnRef = createRef();

  // custom function to close modal using ref
  const closeModalHandler = () => {
    modalCloseBtnRef.current.click();
  }

  const handleModalSave = () =>{
    if(!(todoTitle && todoFirstTask)) {
      toast.error("Please provide title, and 1 task");
      return;
    }


    // call api to save details
    addTodo(todoTitle, todoFirstTask)
    .then(resp=>{
      if(resp.status === 201) {
        toast.success("Todo created.");
    
        // clear the form values
        setState({
          ...state, 
          todoTitle: "",
          todoFirstTask: ""
        })
      }
    })
    .catch(e=>{
      toast.error("Something went wrong while adding details");
      console.error(e);
    })


    

    closeModalHandler();
  }

  return (
    <div className="w-full sm:w-3/4 md:w-2/4 lg:w-2/4 xl:w-1/3 mx-auto">
      <ToastContainer />
      <FabAdd htmlFor="my-modal" />


      {/* todo heading */}
      <h1 className="text-3xl mt-4 text-center">Get things done!</h1>
      {/* todo heading */}


      {/* todo cards */}
      <div className="px-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <p className="card-title">Todo Title</p>
            1. Task 1
            2. Task 2
          </div>
        </div>
      </div>
      {/* todo cards */}



      {/* modal */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />

      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create new Todo List</h3>
          

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Write List Title here..."
              className="input input-bordered w-full"
              name="todoTitle"
              value={todoTitle}
              onChange={handleChange}
            />
          </div>

          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">First Task</span>
              <span className="label-text-alt">Add atleast 1 task</span>
            </label>
            <input
              type="text"
              placeholder="Write Task here..."
              className="input input-bordered w-full"
              name="todoFirstTask"
              value={todoFirstTask}
              onChange={handleChange}
            />
          </div>

          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleModalSave}>Save</button>
            <label htmlFor="my-modal" ref={modalCloseBtnRef} className="btn btn-ghost">
              Cancel!
            </label>
          </div>
        </div>
      </div>
      {/* modal */}
    </div>
  );
};

export default App;
