import React, { useState } from "react";
import "./AddTask.scss";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { createNewTask } from "../../redux/actions/dataActions";

function AddTask({ createNewTask }) {
  const [taskBody, setTaskBody] = useState("");

  const handleChange = (event) => setTaskBody(event.target.value);

  const submit = () => {
    if (taskBody.length === 0) return;
    createNewTask(taskBody);
    setTaskBody("");
  };

  return (
    <div className="add-task-container">
      <input
        className="add-task-input"
        placeholder="Add new task..."
        type="text"
        value={taskBody}
        onChange={handleChange}
      />
      <button onClick={submit} className="add-task-button">
        +
      </button>
    </div>
  );
}

AddTask.propTypes = {
  createNewTask: PropTypes.func.isRequired,
};

const mapActionsToProps = { createNewTask };

export default connect(null, mapActionsToProps)(AddTask);
