import { SET_ERROR, SET_SUCCESS, SET_LOADING_UI } from "../types";

const initialState = {
  loading: false,
  error: null,
  success: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_SUCCESS:
      return { ...state, success: action.payload };
    case SET_LOADING_UI:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
