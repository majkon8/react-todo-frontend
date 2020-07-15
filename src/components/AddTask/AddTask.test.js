import React from "react";
import AddTask from "./AddTask";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

let initialStore = {};
let mockedStore = configureMockStore([thunk])(initialStore);

describe("AddTask component testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        <AddTask />
      </Provider>
    );
  });

  test("includes input and button", () => {
    expect(
      wrapper.containsAllMatchingElements([
        <input
          className="add-task-input"
          placeholder="Add new task..."
          type="text"
        />,
        <button className="add-task-button">+</button>,
      ])
    ).toEqual(true);
  });

  test("initial value of input is ''", () => {
    expect(wrapper.find(".add-task-input").props().value).toEqual("");
  });

  test("typing in input updates state", () => {
    wrapper
      .find(".add-task-input")
      .simulate("change", { target: { value: "task" } });
    expect(wrapper.find(".add-task-input").props().value).toEqual("task");
  });

  test("calls submit function on button click", () => {
    // when submit is called, taskBody state is set to "", so input should be clear
    wrapper
      .find(".add-task-input")
      .simulate("change", { target: { value: "task" } });
    wrapper.find(".add-task-button").simulate("click");
    expect(wrapper.find(".add-task-input").props().value).toEqual("");
  });
});
