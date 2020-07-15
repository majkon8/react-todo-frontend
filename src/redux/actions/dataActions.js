import {
  SET_TASKS,
  SET_LOADING_UI,
  CREATE_TASK,
  DELETE_TASK,
  TOGGLE_TASK_DONE,
} from "../types";
import axios from "axios";

export const getTasks = () => async (dispatch) => {
  dispatch({ type: SET_LOADING_UI, payload: true });
  try {
    const response = await axios.get("/api/tasks/");
    if (!response.data.success) {
      console.error(response.data.message);
      return;
    }
    const tasks = response.data.data;
    dispatch({ type: SET_TASKS, payload: tasks });
  } catch (error) {
    console.error(error);
  } finally {
    dispatch({ type: SET_LOADING_UI, payload: false });
  }
};

export const createNewTask = (body) => async (dispatch) => {
  try {
    const response = await axios.post("/api/tasks/", { body });
    dispatch({ type: CREATE_TASK, payload: response.data.createdTask });
    if (!response.data.success) {
      console.error(response.data.message);
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    const response = await axios.delete("/api/tasks/", { data: { taskId } });
    if (!response.data.success) {
      console.error(response.data.message);
      return;
    }
    dispatch({ type: DELETE_TASK, payload: taskId });
  } catch (error) {
    console.error(error);
  }
};

export const toggleTaskDone = (data) => async (dispatch) => {
  try {
    const response = await axios.patch("/api/tasks/", data);
    if (!response.data.success) {
      console.error(response.data.message);
      return;
    }
    dispatch({ type: TOGGLE_TASK_DONE, payload: data.taskId });
  } catch (error) {
    console.error(error);
  }
};
