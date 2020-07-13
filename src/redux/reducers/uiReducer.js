import { SET_ERRORS, SET_SUCCESSES, SET_LOADING_UI } from "../types";

const initialState = {
  loading: false,
  errors: [],
  successes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return { ...state, errors: action.payload };
    case SET_SUCCESSES:
      return { ...state, successes: action.payload };
    case SET_LOADING_UI:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
