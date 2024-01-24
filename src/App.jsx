import React, { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard";
import { statuses, tasks as initialTasks } from "../src/utils/data.js";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [hoverOver, setHoverOver] = useState(null);
  const columns = statuses.map((status) => {
    const tasksInColumn = tasks.filter((task) => task.status === status);
    return {
      status,
      tasks: tasksInColumn,
    };
  });

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, [hoverOver]);

  const updateTask = (updatedTask) => {
    fetch(`http://localhost:3000/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    setTasks(updatedTasks);
  };
  const handleDrop = (e, status) => {
    e.preventDefault();
    setHoverOver(null);
    const id = e.dataTransfer.getData("id");
    const task = tasks?.find((t) => Number(t.id) === Number(id));
    console.log("Dropped task:", task);
    if (task) {
      updateTask({ ...task, status });
    }
  };
  const handleDragEnter = (status) => {
    setHoverOver(status);
  };

  return (
    <div className="container">
      {columns.map((column) => (
        <div
          onDrop={(e) => handleDrop(e, column.status)}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDragEnter={(e) => handleDragEnter(column.status)}
          key={column.status}
          className="status__column"
        >
          <div>
            <h2>{column.status}</h2>
            {column.tasks.reduce((total, task) => total + task?.points, 0)}
          </div>
          <div
            className={`card__block ${
              hoverOver === column.status ? "light__bg" : ""
            }`}
          >
            {column.tasks.map((task) => (
              <TaskCard key={task.id} task={task} updateTask={updateTask} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
