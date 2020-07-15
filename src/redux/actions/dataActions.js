import { SET_TASKS, SET_LOADING_UI, CREATE_TASK } from "../types";
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
