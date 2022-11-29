import React from "react";

import FabAdd from "./components/fabAdd";
import { createRef } from "react";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addTodo, getAllTodos, addTask, deleteTodo } from "./controllers/todo";
import { useEffect } from "react";
import TodoCard from "./components/TodoCard";

const App = () => {
  const [state, setState] = useState({
    todoTitle: "",
    todoFirstTask: "",
    todos: [],
    todoModalId: "",
    todoModalTask: "",
  });

  const { todoTitle, todoFirstTask, todos, todoModalId, todoModalTask } = state;

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const modalCloseBtnRef = createRef();
  const todoModalCloseBtnRef = createRef();

  // custom function to close modal using ref
  const closeModalHandler = () => {
    modalCloseBtnRef.current.click();
  };

  const closetodoModalHandler = () => {
    todoModalCloseBtnRef.current.click();
  };
  const openTodoModalHandler = (id) => {
    todoModalCloseBtnRef.current.click();
    setState({
      ...state,
      todoModalId: id,
    });
  };

  const handleModalTaskSave = () => {
    if (!todoModalTask) {
      toast.error("Please provide task!");
      return;
    }

    addTask(todoModalId, todoModalTask)
      .then((resp) => {
        if (resp.status === 201) {
          toast.success("Task created.");

          // clear the form values
          setState({
            ...state,
            todoModalId: "",
            todoModalTask: "",
          });

          // reload the todos
          getTodos();
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
      .then((resp) => {
        if (resp.status === 201) {
          toast.success("Todo created.");

          // clear the form values
          setState({
            ...state,
            todoTitle: "",
            todoFirstTask: "",
          });
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
      <h1 className="text-3xl mt-4 text-center">Get things done!</h1>
      {/* todo heading */}

      {/* todo cards */}
      <div className="px-6">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoCard
              todoId={todo._id}
              title={todo.title}
              tasks={todo.tasks}
              key={todo._id}
              onBtnTodoDelete={() => {
                btnDeleteTodo(todo._id);
              }}
              onBtnAddTask={() => {
                openTodoModalHandler(todo._id);
              }}
            />
          ))
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
    </div>
  );
};

export default App;
