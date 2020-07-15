import React from "react";
import "./Task.scss";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { deleteTask } from "../../redux/actions/dataActions";

function Task({ taskId, body, isDone = false, deleteTask }) {
  const handleDeleteTask = () => {
    deleteTask(taskId);
  };
  return (
    <div className={"task" + (isDone ? " is-done" : "")}>
      <i className="icon icon-star-empty fa fa-star-o"></i>
      <p className={"task-body" + (isDone ? " is-done" : "")}>{body}</p>
      <i
        onClick={handleDeleteTask}
        className="icon trash-icon fa fa-trash-o"
      ></i>
    </div>
  );
}

Task.propTypes = {
  body: PropTypes.string.isRequired,
  isDone: PropTypes.bool,
  taskId: PropTypes.number.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

const mapActionsToProps = { deleteTask };

export default connect(null, mapActionsToProps)(Task);
