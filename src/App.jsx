import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


function App() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false);


  const SavetoLS = (todos) => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  };
 
useEffect(() => {
  let savedTodos = localStorage.getItem("Todos");
  if (typeof savedTodos === "string" && savedTodos !== "undefined" && savedTodos !== null) {
    setTodos(JSON.parse(savedTodos));
  } else {
    setTodos([]);
  }
}, []);

  

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = Todos.filter((item) => {
      return item.id === id;
    });
    setTodo(t[0].Todo);
    let newTodos = Todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    SavetoLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = Todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    SavetoLS(newTodos);
  };

  const handleAdd = () => {
    if (Todo === "") return;
    const newTodos = [...Todos, { id: uuidv4(), Todo, iscompleted: false }];
    setTodos(newTodos);
    SavetoLS(newTodos);
    setTodo("");
  };
  
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheck = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = [...Todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos);
    SavetoLS();
  };

  return (
    <>
      <Navbar />
      <div className="mx-2 md:container md:w-1/2 md:mx-auto my-5 bg-violet-300 p-5 rounded-xl min-h-[80vh] flex flex-col item-center">
        <h1 className="text-2xl text-center font-bold">uTasks - your task planner</h1>
        <div className="addtodo my-5  flex flex-col gap-2 justify-center items-center">
          <h2 className="text-lg font-bold">Add Todo</h2>
          <input
            type="text"
            placeholder="Add Todo"
            className="w-full p-1 rounded-md"
            value={Todo}
            onChange={handleChange}
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 font-bold text-white px-3 py-1 rounded-md hover:bg-violet-900 w-full"
          >
            Save
          </button>
        </div>
        <div className="flex items-center justify-end gap-2">

        <input
          id="showFinished"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
          /> <label htmlFor="showFinished">Show Finished</label> 
          </div>
        <h1 className="text-lg font-bold">Your Todos</h1>
        <div className="todos">
          {Todos.length === 0 && <div className="m-3">No Todos</div>}
          {Todos.map((item) => {
            return (
              (showFinished || !item.iscompleted) && (
                <div
                  key={item.id}
                  className="todo flex items-center w-full justify-between my-3"
                >
                  <div className="flex items-center w-3/4 gap-3">
                    <input
                      onChange={handleCheck}
                      checked={item.iscompleted}
                      type="checkbox"
                      name={item.id}
                    />
                    <div className={item.iscompleted ? "line-through w-[90%] break-words" : "w-[90%] break-words"}>
                      {item.Todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-violet-800 font-bold text-white px-3 py-1 rounded-md hover:bg-violet-900 mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 font-bold text-white px-3 py-1 rounded-md hover:bg-violet-900 mx-1"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
