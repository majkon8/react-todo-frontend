import userReducer from "./userReducer";
import { SET_AUTHENTICATED } from "../types";

describe("Testing user reducers", () => {
  test("Should return default state", () => {
    const newState = userReducer(undefined, {});
    expect(newState).toEqual({ isAuthenticated: false });
  });

  test("Should return new state with isAuthenticated set to true", () => {
    const newState = userReducer(undefined, {
      type: SET_AUTHENTICATED,
      payload: true,
    });
    expect(newState).toEqual({ isAuthenticated: true });
  });
});
