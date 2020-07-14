import React from "react";
import "./Task.scss";
import PropTypes from "prop-types";

function Task({ body, isDone = false }) {
  return (
    <div className={"task" + (isDone ? " is-done" : "")}>
      <i className="icon icon-star-empty fa fa-star-o"></i>
      <p className={"task-body" + (isDone ? " is-done" : "")}>{body}</p>
      <i className="icon trash-icon fa fa-trash-o"></i>
    </div>
  );
}

Task.propTypes = {
  body: PropTypes.string.isRequired,
  isDone: PropTypes.bool,
};

export default Task;
