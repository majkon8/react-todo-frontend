import React from "react";
import Task from "./Task";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

let initialStore = {};
let mockedStore = configureMockStore([thunk])(initialStore);

describe("Task component testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        <Task body="task" done={false} taskId={1} />
      </Provider>
    );
  });

  test("includes .task div", () => {
    expect(wrapper.find(".task").exists()).toEqual(true);
  });

  test("displays task body", () => {
    expect(wrapper.find(".task-body").text()).toEqual("task");
  });
});
