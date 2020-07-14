import React from "react";
import AddTask from "../AddTask/AddTask";
import Task from "../Task/Task";
import "./Tasks.scss";

export default function Tasks() {
  return (
    <div>
      <AddTask />
      <div className="tasks-container"></div>
    </div>
  );
}
