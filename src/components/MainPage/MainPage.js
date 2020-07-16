import React, { useState } from "react";
import "./MainPage.scss";
import Tasks from "../Tasks/Tasks";
import Groups from "../Groups/Groups";
import Logout from "../Logout/Logout";

export default function MainPage() {
  const [showGroups, setShowGroups] = useState(false);

  const togglePanel = () => setShowGroups(!showGroups);

  return (
    <div className="flex-container">
      <div className="page-container">
        <Logout />
        <div className={`group-panel ${showGroups && "show-panel"}`}>
          <i
            onClick={togglePanel}
            class={`arrow-icon fa ${
              showGroups ? "fa-arrow-left" : "fa-arrow-right"
            }`}
            aria-hidden="true"
          ></i>
          <Groups />
        </div>
        <div className="task-panel">
          <Tasks />
        </div>
      </div>
    </div>
  );
}
