import {
  SET_LOADING_UI,
  SET_ERROR,
  SET_SUCCESS,
  SET_AUTHENTICATED,
} from "../types";
import axios from "axios";

export const signup = (userData) => async (dispatch) => {
  dispatch({ type: SET_LOADING_UI, payload: true });
  try {
    const response = await axios.post("/api/users/signup", userData);
    if (!response.data.success) {
      dispatch({ type: SET_ERROR, payload: response.data.message });
      return;
    }
    dispatch({ type: SET_SUCCESS, payload: response.data.message });
  } catch (error) {
    console.error(error);
  } finally {
    dispatch({ type: SET_LOADING_UI, payload: false });
  }
};

export const login = (userData) => async (dispatch) => {
  dispatch({ type: SET_LOADING_UI, payload: true });
  try {
    const response = await axios.post("/api/users/login", userData);
    if (!response.data.success) {
      dispatch({ type: SET_ERROR, payload: response.data.message });
      return;
    }
    setAuthorizationHeader(response.data.data);
    dispatch({ type: SET_AUTHENTICATED, payload: true });
    dispatch({ type: SET_SUCCESS, payload: response.data.message });
  } catch (error) {
    console.error(error);
  } finally {
    dispatch({ type: SET_LOADING_UI, payload: false });
  }
};

// HELPERS
const setAuthorizationHeader = (tokens) => {
  const accessToken = tokens.accessToken;
  const refreshToken = tokens.refreshToken;
  const authHeader = `Bearer ${accessToken}`;
  axios.defaults.headers.common["Authorization"] = authHeader;
  localStorage.setItem("refreshToken", refreshToken);
};
