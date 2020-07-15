import dataReducer from "./dataReducer";
import {
  SET_TASKS,
  CREATE_TASK,
  DELETE_TASK,
  TOGGLE_TASK_DONE,
  TOGGLE_TASK_IMPORTANT,
  SET_GROUP,
  SET_GROUPS,
  CREATE_GROUP,
  DELETE_GROUP,
} from "../types";

describe("Testing data reducers", () => {
  test("Should return default state", () => {
    const newState = dataReducer(undefined, {});
    expect(newState).toEqual({ tasks: [], selectedGroup: null, groups: [] });
  });

  describe("Task reducers", () => {
    test("Should return new state with two tasks", () => {
      const tasks = [
        { id: 1, body: "task1" },
        { id: 2, body: "task2" },
      ];
      const newState = dataReducer(undefined, {
        type: SET_TASKS,
        payload: tasks,
      });
      expect(newState).toEqual({
        groups: [],
        selectedGroup: null,
        tasks: [
          { id: 1, body: "task1" },
          { id: 2, body: "task2" },
        ],
      });
    });

    test("Should add task to state", () => {
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

    test("Should remove task from state", () => {
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
      expect(newState).toEqual({ tasks: [] });
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
      expect(newState).toEqual({ tasks: [{ id: 3, done: true }] });
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
      expect(newState).toEqual({ tasks: [{ id: 3, important: false }] });
    });
  });

  describe("Groups reducers", () => {
    test("Should return new state with two groups", () => {
      const groups = [
        { id: 1, name: "group1" },
        { id: 2, name: "group2" },
      ];
      const newState = dataReducer(undefined, {
        type: SET_GROUPS,
        payload: groups,
      });
      expect(newState).toEqual({
        groups: [
          { id: 1, name: "group1" },
          { id: 2, name: "group2" },
        ],
        selectedGroup: null,
        tasks: [],
      });
    });

    test("Should add group to state", () => {
      const group = { id: 3, name: "group3" };
      const newState = dataReducer(
        {
          groups: [
            { id: 1, name: "group1" },
            { id: 2, name: "group2" },
          ],
        },
        {
          type: CREATE_GROUP,
          payload: group,
        }
      );
      expect(newState).toEqual({
        groups: [
          { id: 1, name: "group1" },
          { id: 2, name: "group2" },
          { id: 3, name: "group3" },
        ],
      });
    });

    test("Should remove group from state", () => {
      const groupId = 3;
      const newState = dataReducer(
        {
          groups: [{ id: 3, name: "group3" }],
        },
        {
          type: DELETE_GROUP,
          payload: groupId,
        }
      );
      expect(newState).toEqual({ groups: [] });
    });

    test("Should set selectedGroup to 1", () => {
      const groupId = 1;
      const newState = dataReducer(undefined, {
        type: SET_GROUP,
        payload: groupId,
      });
      expect(newState).toEqual({
        tasks: [],
        selectedGroup: 1,
        groups: [],
      });
    });
  });
});
