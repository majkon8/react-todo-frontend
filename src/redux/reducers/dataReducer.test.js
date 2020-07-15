import dataReducer from "./dataReducer";
import {
  SET_TASKS,
  CREATE_TASK,
  DELETE_TASK,
  TOGGLE_TASK_DONE,
  TOGGLE_TASK_IMPORTANT,
} from "../types";

describe("Testing data reducers", () => {
  test("Should return default state", () => {
    const newState = dataReducer(undefined, {});
    expect(newState).toEqual({ tasks: [] });
  });

  test("Should return new state with two tasks", () => {
    const task = [
      { id: 1, body: "task1" },
      { id: 2, body: "task2" },
    ];
    const newState = dataReducer(undefined, {
      type: SET_TASKS,
      payload: task,
    });
    expect(newState).toEqual({
      tasks: [
        { id: 1, body: "task1" },
        { id: 2, body: "task2" },
      ],
    });
  });

  test("Should add another task", () => {
    const task = { id: 3, body: "task3" };
    const newState = dataReducer(
      {
        tasks: [
          { id: 1, body: "task1" },
          { id: 2, body: "task2" },
        ],
      },
      {
        type: CREATE_TASK,
        payload: task,
      }
    );
    expect(newState).toEqual({
      tasks: [
        { id: 1, body: "task1" },
        { id: 2, body: "task2" },
        { id: 3, body: "task3" },
      ],
    });
  });

  test("Should delete task", () => {
    const taskId = 3;
    const newState = dataReducer(
      {
        tasks: [{ id: 3, body: "task3" }],
      },
      {
        type: DELETE_TASK,
        payload: taskId,
      }
    );
    expect(newState).toEqual({
      tasks: [],
    });
  });

  test("Should toggle done to true", () => {
    const taskId = 3;
    const newState = dataReducer(
      {
        tasks: [{ id: 3, done: false }],
      },
      {
        type: TOGGLE_TASK_DONE,
        payload: taskId,
      }
    );
    expect(newState).toEqual({
      tasks: [{ id: 3, done: true }],
    });
  });

  test("Should toggle important to false", () => {
    const taskId = 3;
    const newState = dataReducer(
      {
        tasks: [{ id: 3, important: true }],
      },
      {
        type: TOGGLE_TASK_IMPORTANT,
        payload: taskId,
      }
    );
    expect(newState).toEqual({
      tasks: [{ id: 3, important: false }],
    });
  });
});
