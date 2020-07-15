import uiReducer from "./uiReducer";
import { SET_ERROR, SET_SUCCESS, SET_LOADING_UI } from "../types";

describe("Testing UI reducers", () => {
  test("Should return default state", () => {
    const newState = uiReducer(undefined, {});
    expect(newState).toEqual({
      loading: false,
      error: null,
      success: null,
    });
  });

  test("Should return new state with an error set to 'error'", () => {
    const error = "error";
    const newState = uiReducer(undefined, {
      type: SET_ERROR,
      payload: error,
    });
    expect(newState).toEqual({
      loading: false,
      error: "error",
      success: null,
    });
  });

  test("Should return new state without a success", () => {
    const newState = uiReducer(
      { loading: false, error: null, success: "success" },
      {
        type: SET_SUCCESS,
        payload: null,
      }
    );
    expect(newState).toEqual({
      loading: false,
      error: null,
      success: null,
    });
  });

  test("Should return new state with loading set to true", () => {
    const newState = uiReducer(
      { loading: false, error: null, success: null },
      {
        type: SET_LOADING_UI,
        payload: true,
      }
    );
    expect(newState).toEqual({
      loading: true,
      error: null,
      success: null,
    });
  });
});
