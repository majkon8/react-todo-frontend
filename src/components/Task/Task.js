import React from "react";
import "./Task.scss";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import {
  deleteTask,
  toggleTaskDone,
  togggleTaskImportant,
} from "../../redux/actions/dataActions";

function Task({
  taskId,
  body,
  done,
  important,
  createdAt,
  deleteTask,
  toggleTaskDone,
  togggleTaskImportant,
}) {
  const handleDeleteTask = (event) => {
    event.stopPropagation();
    deleteTask(taskId);
  };

  const handleToggleTaskDone = () => {
    const data = { taskId };
    data.done = done ? false : true;
    toggleTaskDone(data);
  };

  const handleToggleTaskImportant = (event) => {
    event.stopPropagation();
    const data = { taskId };
    data.important = important ? false : true;
    togggleTaskImportant(data);
  };

  return (
    <div
      onClick={handleToggleTaskDone}
      className={"task" + (done ? " task-done" : "")}
    >
      <div
        onClick={handleToggleTaskImportant}
        className={
          important ? "reverse-icon-star-container" : "icon-star-container"
        }
      >
        <i className="icon icon-star icon-star-empty fa fa-star-o"></i>
        <i className="icon icon-star icon-star-full fa fa-star"></i>
      </div>

      <p className={"task-body" + (done ? " task-body-done" : "")}>{body}</p>
      <div onClick={handleDeleteTask} className="icon-trash-container">
        <i className="icon icon-trash icon-trash-empty fa fa-trash-o"></i>
        <i className="icon icon-trash icon-trash-full fa fa-trash"></i>
      </div>
      <p className={"date" + (done ? " task-body-done" : "")}>
        Added: {createdAt}
      </p>
    </div>
  );
}

Task.propTypes = {
  body: PropTypes.string.isRequired,
  done: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
  important: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
  taskId: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTaskDone: PropTypes.func.isRequired,
  togggleTaskImportant: PropTypes.func.isRequired,
};

const mapActionsToProps = { deleteTask, toggleTaskDone, togggleTaskImportant };

export default connect(null, mapActionsToProps)(Task);
