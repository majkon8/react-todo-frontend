import React, { useState } from "react";
import "./AddTask.scss";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { createTask } from "../../redux/actions/dataActions";

function AddTask({ createTask, selectedGroup }) {
  const [taskBody, setTaskBody] = useState("");

  const handleChange = (event) => {
    if (taskBody.length >= 255) return;
    setTaskBody(event.target.value);
  };

  const submit = () => {
    if (taskBody.length === 0) return;
    const data = {
      body: taskBody,
      groupId: selectedGroup && selectedGroup !== 0 ? selectedGroup : null,
    };
    createTask(data);
    setTaskBody("");
  };

  return (
    <div className="add-container add-task-container">
      <input
        className="add-input add-task-input"
        placeholder="Add new task..."
        type="text"
        value={taskBody}
        onChange={handleChange}
      />
      <button onClick={submit} className="add-button add-task-button">
        +
      </button>
    </div>
  );
}

AddTask.propTypes = {
  createTask: PropTypes.func.isRequired,
  selectedGroup: PropTypes.number,
};

const mapStateToProps = (state) => ({
  selectedGroup: state.data.selectedGroup,
});
const mapActionsToProps = { createTask };

export default connect(mapStateToProps, mapActionsToProps)(AddTask);
