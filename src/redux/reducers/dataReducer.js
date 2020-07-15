import {
  SET_TASKS,
  CREATE_TASK,
  DELETE_TASK,
  TOGGLE_TASK_DONE,
  TOGGLE_TASK_IMPORTANT,
} from "../types";

const initialState = {
  tasks: [],
};

export default function (state = initialState, action) {
  let updatedTasks;
  switch (action.type) {
    case SET_TASKS:
      return { ...state, tasks: action.payload };
    case CREATE_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case DELETE_TASK:
      return {
        ...state,
        tasks: [...state.tasks.filter((task) => task.id !== action.payload)],
      };
    case TOGGLE_TASK_DONE:
      updatedTasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          task.done = !task.done;
        }
        return task;
      });
      return {
        ...state,
        tasks: [...updatedTasks],
      };
    case TOGGLE_TASK_IMPORTANT:
      updatedTasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          task.important = !task.important;
        }
        return task;
      });
      return {
        ...state,
        tasks: [...updatedTasks],
      };
    default:
      return state;
  }
}
