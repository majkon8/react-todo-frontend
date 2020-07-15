import React from "react";
import "./Task.scss";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { deleteTask, toggleTaskDone } from "../../redux/actions/dataActions";

function Task({ taskId, body, done, deleteTask, toggleTaskDone }) {
  const handleDeleteTask = (event) => {
    event.stopPropagation();
    deleteTask(taskId);
  };

  const handleToggleTaskDone = () => {
    const data = { taskId };
    data.done = done ? false : true;
    toggleTaskDone(data);
  };

  return (
    <div
      onClick={handleToggleTaskDone}
      className={"task" + (done ? " task-done" : "")}
    >
      <div className="icon-star-container">
        <i className="icon icon-star icon-star-empty fa fa-star-o"></i>
        <i className="icon icon-star icon-star-full fa fa-star"></i>
      </div>

      <p className={"task-body" + (done ? " task-done" : "")}>{body}</p>
      <div className="icon-trash-container">
        <i
          onClick={handleDeleteTask}
          className="icon icon-trash icon-trash-empty fa fa-trash-o"
        ></i>
        <i
          onClick={handleDeleteTask}
          className="icon icon-trash icon-trash-full fa fa-trash"
        ></i>
      </div>
    </div>
  );
}

Task.propTypes = {
  body: PropTypes.string.isRequired,
  done: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
  taskId: PropTypes.number.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTaskDone: PropTypes.func.isRequired,
};

const mapActionsToProps = { deleteTask, toggleTaskDone };

export default connect(null, mapActionsToProps)(Task);