import { SET_TASKS, CREATE_TASK, DELETE_TASK } from "../types";

const initialState = {
  tasks: [],
};

export default function (state = initialState, action) {
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
    default:
      return state;
  }
}
