import React from "react";
import "./MainPage.scss";
import Tasks from "../Tasks/Tasks";
import Groups from "../Groups/Groups";

export default function MainPage() {
  return (
    <div className="flex-container">
      <div className="page-container">
        <div className="group-panel">
          <Groups />
        </div>
        <div className="task-panel">
          <Tasks />
        </div>
      </div>
    </div>
  );
}
