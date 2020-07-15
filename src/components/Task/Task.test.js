import React from "react";
import Task from "./Task";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { formatDate } from "../Tasks/Tasks";

let initialStore = {};
let mockedStore = configureMockStore([thunk])(initialStore);

describe("Task component testing", () => {
  let wrapper;
  beforeEach(() => {
    const dateTime = formatDate("2020-07-15T11:37:41.000Z");
    wrapper = mount(
      <Provider store={mockedStore}>
        <Task
          body="task"
          done={false}
          important={false}
          taskId={1}
          createdAt={dateTime}
        />
      </Provider>
    );
  });

  test("includes .task div", () => {
    expect(wrapper.find(".task").exists()).toEqual(true);
  });

  test("displays task body", () => {
    expect(wrapper.find(".task-body").text()).toEqual("task");
  });

  test("displays add date time correctly", () => {
    expect(wrapper.find(".date").text()).toEqual("Added: 15.07.2020 11:37");
  });
});
