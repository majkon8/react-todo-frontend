import React from "react";
import "./AddTask.scss";

export default function AddTask() {
  return (
    <div className="add-task-container">
      <input
        className="add-task-input"
        placeholder="Add new task..."
        type="text"
      />
      <button className="add-task-button">+</button>
    </div>
  );
}
