import React, { useState, useEffect } from "react";
import AddTask from "../AddTask/AddTask";
import Task from "../Task/Task";
import TaskSkeleton from "../TaskSkeleton/TaskSkeleton";
import "./Tasks.scss";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { getTasks } from "../../redux/actions/dataActions";

export function formatDate(dateTime) {
  const date = dateTime.slice(0, 10).split("-").reverse().join(".");
  const time = dateTime.slice(11, 16);
  return `${date} ${time}`;
}

function Tasks({ getTasks, loading, tasks, selectedGroup }) {
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    setFilteredTasks(
      tasks.filter((task) => {
        if (selectedGroup !== 0) return task.group_id === selectedGroup;
        if (selectedGroup === 0) return task.important == true;
        return task;
      })
    );
  }, [tasks, selectedGroup]);

  return (
    <div>
      <AddTask />
      <div className="tasks-container">
        {loading
          ? Array.apply(null, Array(5)).map((el, index) => (
              <TaskSkeleton key={index} />
            ))
          : filteredTasks.map((task, index) => (
              <Task
                taskId={task.id}
                body={task.body}
                done={task.done}
                important={task.important}
                createdAt={formatDate(task.created_at)}
                key={index}
              />
            ))}
      </div>
    </div>
  );
}

Tasks.propTypes = {
  getTasks: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  tasks: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  tasks: state.data.tasks,
  selectedGroup: state.data.selectedGroup,
});
const mapActionsToProps = { getTasks };

export default connect(mapStateToProps, mapActionsToProps)(Tasks);
