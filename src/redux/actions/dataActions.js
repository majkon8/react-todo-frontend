import {
  SET_TASKS,
  SET_LOADING_UI,
  CREATE_TASK,
  DELETE_TASK,
  TOGGLE_TASK_DONE,
  TOGGLE_TASK_IMPORTANT,
  SET_GROUP,
  SET_GROUPS,
  CREATE_GROUP,
  DELETE_GROUP,
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

export const createTask = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/api/tasks/", data);
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
    const response = await axios.patch("/api/tasks/done", data);
    if (!response.data.success) {
      console.error(response.data.message);
      return;
    }
    dispatch({ type: TOGGLE_TASK_DONE, payload: data.taskId });
  } catch (error) {
    console.error(error);
  }
};

export const togggleTaskImportant = (data) => async (dispatch) => {
  try {
    const response = await axios.patch("/api/tasks/important", data);
    if (!response.data.success) {
      console.error(response.data.message);
      return;
    }
    dispatch({ type: TOGGLE_TASK_IMPORTANT, payload: data.taskId });
  } catch (error) {
    console.error(error);
  }
};

export const setGroup = (groupId) => (dispatch) => {
  dispatch({ type: SET_GROUP, payload: groupId });
};

export const getGroups = () => async (dispatch) => {
  dispatch({ type: SET_LOADING_UI, payload: true });
  try {
    const response = await axios.get("/api/groups/");
    if (!response.data.success) {
      console.error(response.data.message);
      return;
    }
    const groups = response.data.data;
    dispatch({ type: SET_GROUPS, payload: groups });
  } catch (error) {
    console.error(error);
  } finally {
    dispatch({ type: SET_LOADING_UI, payload: false });
  }
};

export const createGroup = (name) => async (dispatch) => {
  try {
    const response = await axios.post("/api/groups/", { name });
    dispatch({ type: CREATE_GROUP, payload: response.data.createdGroup });
    if (!response.data.success) {
      console.error(response.data.message);
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteGroup = (groupId) => async (dispatch) => {
  try {
    const response = await axios.delete("/api/groups/", { data: { groupId } });
    if (!response.data.success) {
      console.error(response.data.message);
      return;
    }
    dispatch({ type: DELETE_GROUP, payload: groupId });
  } catch (error) {
    console.error(error);
  }
};
