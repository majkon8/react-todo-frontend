import React from "react";
import "./MainPage.scss";
import Tasks from "../Tasks/Tasks";
import Groups from "../Groups/Groups";
import Logout from "../Logout/Logout";

export default function MainPage() {
  return (
    <div className="flex-container">
      <div className="page-container">
        <Logout />
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
