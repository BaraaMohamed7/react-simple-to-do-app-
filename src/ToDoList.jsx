/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

function ToDoList() {

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [newTask, setNewTask] = useState("");

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  }


  const handleAddNewTask = () => {
    if (newTask != "") {
      setTasks(t => [...t, newTask]);
      setNewTask("");
    }
  }

  const handleDeleteTask = (index) => {
    setTasks(t => t.filter((_, i) => index !== i));
  }
  const handleMoveTaskUp = (index) => {
    if (index > 0) {
      const updatedtasks = [...tasks];
      [updatedtasks[index], updatedtasks[index - 1]] = [updatedtasks[index - 1], updatedtasks[index]]
      setTasks(updatedtasks);
    }
  }

  const handleMoveTaskDown = (index) => {
    if (index < tasks.length - 1) {
      const updatedtasks = [...tasks];
      [updatedtasks[index], updatedtasks[index + 1]] = [updatedtasks[index + 1], updatedtasks[index]]
      setTasks(updatedtasks);
    }
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

  return (
    <div className="to-do-list-container">

      <h1>To-Do List</h1>

      <div className="task-input-container">
        <input className="task-input" type="text" placeholder="add new task" onChange={(e) => handleNewTaskChange(e)} value={newTask} />
        <button className="add-btn" onClick={handleAddNewTask}>Add</button>
      </div>
      <ul className="to-do-list">
        {tasks.map((task, index) =>
          <li key={index} className="task">
            <span>{task}</span>
            <span className="btns" >
              <button onClick={() => handleDeleteTask(index)} className="delete-btn">
                Delete
              </button>
              <button onClick={() => handleMoveTaskUp(index)} className="move-btn">
                Up
              </button>
              <button onClick={() => handleMoveTaskDown(index)} className="move-btn">
                Down
              </button>
            </span>
          </li>)}
      </ul>

    </div>
  )
}

export default ToDoList
