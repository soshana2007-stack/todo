import React, { useState } from "react";
import "./Todo.css";

function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Add a new task
  const addTask = () => {
    const text = task.trim();

    if (text === "") return;

    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTask("");
  };

  // Checkbox - mark complete/incomplete
  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((item) => item.id !== id)
    );
  };

  // Counts
  const completedCount = tasks.filter(
    (item) => item.completed
  ).length;

  const incompleteCount = tasks.length - completedCount;

  // Press Enter to add
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-card">
        <h1>To-Do List</h1>

        <div className="input-box">
          <input
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button className="add-btn" onClick={addTask}>
            Add
          </button>
        </div>

        <div className="count">
          Completed: {completedCount} | Incomplete: {incompleteCount}
        </div>

        <div className="task-list">
          {tasks.map((item) => (
            <div className="task-item" key={item.id}>
              <label className="task-left">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTask(item.id)}
                />

                <span className={item.completed ? "completed" : ""}>
                  {item.text}
                </span>
              </label>

              <button
                className="delete-btn"
                onClick={() => deleteTask(item.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <p className="empty-message">No tasks yet</p>
        )}
      </div>
    </div>
  );
}

export default Todo;