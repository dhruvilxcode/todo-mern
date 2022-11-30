import React from "react";

import FabAdd from "./components/fabAdd";
import { createRef } from "react";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addTodo, getAllTodos, addTask, deleteTodo, updateTask, updateTodo } from "./controllers/todo";
import { useEffect } from "react";
import TodoCard from "./components/TodoCard";

const App = () => {
  const [state, setState] = useState({
    todoTitle: "",
    todoFirstTask: "",
    todos: [],
    todoModalId: "",
    todoModalTask: "",
    todoModalUpdateTask: "",
    todoModalUpdateTaskNew: "",
    todoModalUpdateTodo: "",
    todoModalUpdateTodoNew: ""
  });

  const [showSearch, setShowSearch] = useState(false);
  const [searchStr, setSearchStr] = useState("");

  const { todoTitle, todoFirstTask, todos, todoModalId, todoModalTask, todoModalUpdateTask, todoModalUpdateTaskNew, todoModalUpdateTodo, todoModalUpdateTodoNew } = state;

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const modalCloseBtnRef = createRef();
  const todoModalCloseBtnRef = createRef();
  const todoUpdateModalCloseBtnRef = createRef();
  const todoUpdateTitleModalCloseBtnRef = createRef();

  // custom function to close modal using ref
  const closeModalHandler = () => {
    modalCloseBtnRef.current.click();
  };

  const closetodoModalHandler = () => {
    todoModalCloseBtnRef.current.click();
  };

  const closeTodoTaskUpdateModal = () =>{
    todoUpdateModalCloseBtnRef.current.click();
  }

  const closeTodoUpdateModal = () =>{
    todoUpdateTitleModalCloseBtnRef.current.click();
  }

  const openTodotaskUpdateModal = (id, task) => {
    todoUpdateModalCloseBtnRef.current.click();
    setState({
      ...state,
      todoModalId: id,
      todoModalUpdateTask: task,
      todoModalUpdateTaskNew: task,
    });
  }

  const openTodoModalHandler = (id) => {
    todoModalCloseBtnRef.current.click();
    setState({
      ...state,
      todoModalId: id,
    });
  };

  const openTodoUpdateModal = (id, title) => {
    todoUpdateTitleModalCloseBtnRef.current.click();
    setState({
      ...state,
      todoModalId: id,
      todoModalUpdateTodo: title,
      todoModalUpdateTodoNew: title,
    });
  }

  const handleModalTodoUpdate = () =>{
    // update todo title

    if(!(todoModalId && todoModalUpdateTodo && todoModalUpdateTodoNew)) {
      toast.error("something went wrong")
      return;
    }

    updateTodo(todoModalId, todoModalUpdateTodoNew)
    .then(async resp=>{
      if(resp.status === 200) {
        toast.success("Todo updated");
        setState({
          ...state,
          todoModalId: "",
          todoModalUpdateTodo: "",
          todoModalUpdateTodoNew: "",
        });
        closeTodoUpdateModal();
        await getTodos();
        return;
      }

      toast.error("can't update todo right now!, try later");
    })
    .catch(e=>{
      toast.error("Something went wrong while changing details");
      console.error(e);
    })

  }

  const handleModalTaskUpdate = () => {
    // task update
    if(!(todoModalId && todoModalUpdateTaskNew)) {
      toast.error("something went wrong")
      return;
    }

    console.log(todoModalId, todoModalUpdateTask, todoModalUpdateTaskNew);

    updateTask(todoModalId, todoModalUpdateTask, todoModalUpdateTaskNew)
    .then(async resp=>{
      if(resp.status === 201) {
        toast.success("Task Updated.");
        setState({
          ...state,
          todoModalId: "",
          todoModalUpdateTask: "",
          todoModalUpdateTaskNew: "",
        });
        closeTodoTaskUpdateModal();
        await getTodos();
      }
    })
    .catch(e=>{
      toast.error("Something went wrong while adding details");
      console.error(e);
    })
    
  }

  const handleModalTaskSave = () => {
    if (!todoModalTask) {
      toast.error("Please provide task!");
      return;
    }

    addTask(todoModalId, todoModalTask)
      .then(async (resp) => {
        if (resp.status === 201) {
          toast.success("Task created.");

          // clear the form values
          setState({
            ...state,
            todoModalId: "",
            todoModalTask: "",
          });

          // reload the todos
          await getTodos();
        }
      })
      .catch((e) => {
        toast.error("Something went wrong while adding details");
        console.error(e);
      });

    closetodoModalHandler();
  };

  const handleModalSave = () => {
    if (!(todoTitle && todoFirstTask)) {
      toast.error("Please provide title, and 1 task");
      return;
    }

    // call api to save details
    addTodo(todoTitle, todoFirstTask)
      .then(async (resp) => {
        if (resp.status === 201) {
          toast.success("Todo created.");

          // clear the form values
          setState({
            ...state,
            todoTitle: "",
            todoFirstTask: "",
          });

          // get all todos
          await getTodos();
        }
      })
      .catch((e) => {
        toast.error("Something went wrong while adding details");
        console.error(e);
      });

    closeModalHandler();
  };

  const getTodos = async () => {
    try {
      const resp = await getAllTodos();

      if (resp.status === 200) {
        const allTodos = resp.data;

        setState({
          ...state,
          todos: allTodos,
        });

        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const btnDeleteTodo = (id) => {
    try {
      deleteTodo(id)
        .then((resp) => {
          if (resp.status === 200) {
            window.location.reload();
          }
        })
        .catch((e) => {
          toast.error("Something went wrong while deleting todo");
          console.error(e);
        });
    } catch (error) {
      toast.error("something went wrong, while deleting todo!");
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="w-full sm:w-3/4 md:w-2/4 lg:w-2/4 xl:w-1/3 mx-auto">
      <ToastContainer />
      <FabAdd htmlFor="my-modal" />

      {/* todo heading */}
      <div className="flex justify-between items-center px-9 py-9">
        <div></div>
        <h1 className="text-3xl text-center">Get things done!</h1>
        <div>
          <button onClick={()=>{
            setShowSearch(!showSearch)
          }} className="btn btn-circle border-transparent btn-outline btn-ghost btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m19.6 21-6.3-6.3q-.75.6-1.725.95Q10.6 16 9.5 16q-2.725 0-4.612-1.887Q3 12.225 3 9.5q0-2.725 1.888-4.613Q6.775 3 9.5 3t4.613 1.887Q16 6.775 16 9.5q0 1.1-.35 2.075-.35.975-.95 1.725l6.3 6.3ZM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5q0-1.875-1.312-3.188Q11.375 5 9.5 5 7.625 5 6.312 6.312 5 7.625 5 9.5q0 1.875 1.312 3.188Q7.625 14 9.5 14Z"/></svg>
          </button>
        </div>
      </div>
      {/* todo heading */}


      {/* search */}
      {showSearch?<div className="w-full mb-4 px-6">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Search..."
          value={searchStr}
          onChange={e=>{
            setSearchStr(e.target.value);
          }}
        />
      </div>:<></>}
      {/* search */}


      {/* todo cards */}
      <div className="px-6 pb-28">
        {todos.length > 0 ? (
          <>
            {
              todos.filter(todo=> {
                if(searchStr) {
                  if(todo.title.toLowerCase().search(searchStr) != -1 || todo.tasks.some(t=>t.toLowerCase().includes(searchStr))) {
                    return true;
                  }
                  return false;
                }
                return true;
              } ).map(todo=>
              <TodoCard
                todoId={todo._id}
                title={todo.title}
                tasks={todo.tasks}
                key={todo._id}
                onBtnTodoUpdate={()=>{
                  openTodoUpdateModal(todo._id, todo.title);
                }}
                onBtnTodoDelete={() => {
                  btnDeleteTodo(todo._id);
                }}
                onBtnAddTask={() => {
                  openTodoModalHandler(todo._id);
                }}
                onBtnUpdateTask={
                  (task)=>{
                    openTodotaskUpdateModal(todo._id, task);
                  }
                }
              />)
            }
          </>
        ) : (
          <div>No todos found!</div>
        )}
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
            <button className="btn btn-primary" onClick={handleModalSave}>
              Save
            </button>
            <label
              htmlFor="my-modal"
              ref={modalCloseBtnRef}
              className="btn btn-ghost"
            >
              Cancel!
            </label>
          </div>
        </div>
      </div>
      {/* modal */}

      {/* modal add task */}
      <input type="checkbox" id="my-modal-add-task" className="modal-toggle" />

      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Task</h3>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Task</span>
            </label>
            <input
              type="text"
              placeholder="Write Task detail here..."
              className="input input-bordered w-full"
              name="todoModalTask"
              value={todoModalTask}
              onChange={handleChange}
            />
          </div>

          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleModalTaskSave}>
              Save
            </button>
            <label
              htmlFor="my-modal-add-task"
              ref={todoModalCloseBtnRef}
              className="btn btn-ghost"
            >
              Cancel!
            </label>
          </div>
        </div>
      </div>
      {/* modal add task */}

      {/* modal update task */}
      <input type="checkbox" id="my-modal-update-task" className="modal-toggle" />

      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Task</h3>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Task</span>
            </label>
            <input
              type="text"
              placeholder="Write Task detail here..."
              className="input input-bordered w-full"
              name="todoModalUpdateTaskNew"
              value={todoModalUpdateTaskNew}
              onChange={handleChange}
            />
          </div>

          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleModalTaskUpdate}>
              Save
            </button>
            <label
              htmlFor="my-modal-update-task"
              ref={todoUpdateModalCloseBtnRef}
              className="btn btn-ghost"
            >
              Cancel!
            </label>
          </div>
        </div>
      </div>
      {/* modal update task */}


      {/* modal update todo */}
      <input type="checkbox" id="my-modal-update-todo" className="modal-toggle" />

      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Todo</h3>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Todo Title</span>
            </label>
            <input
              type="text"
              placeholder="Write Todo title here..."
              className="input input-bordered w-full"
              name="todoModalUpdateTodoNew"
              value={todoModalUpdateTodoNew}
              onChange={handleChange}
            />
          </div>

          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleModalTodoUpdate}>
              Save
            </button>
            <label
              htmlFor="my-modal-update-todo"
              ref={todoUpdateTitleModalCloseBtnRef}
              className="btn btn-ghost"
            >
              Cancel!
            </label>
          </div>
        </div>
      </div>
      {/* modal update todo */}
    </div>
  );
};

export default App;
