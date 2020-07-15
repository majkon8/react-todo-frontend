import React from "react";
import AddGroup from "./AddGroup";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

let initialStore = {};
let mockedStore = configureMockStore([thunk])(initialStore);

describe("AddGroup component testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        <AddGroup />
      </Provider>
    );
  });

  test("includes input and button", () => {
    expect(
      wrapper.containsAllMatchingElements([
        <input
          className="add-input add-group-input"
          placeholder="Add new group..."
          type="text"
        />,
        <button className="add-button add-group-button">+</button>,
      ])
    ).toEqual(true);
  });

  test("initial value of input is ''", () => {
    expect(wrapper.find(".add-group-input").props().value).toEqual("");
  });

  test("typing in input updates state", () => {
    wrapper
      .find(".add-group-input")
      .simulate("change", { target: { value: "group" } });
    expect(wrapper.find(".add-group-input").props().value).toEqual("group");
  });

  test("calls submit function on button click", () => {
    // when submit is called, groupBody state is set to "", so input should be clear
    wrapper
      .find(".add-group-input")
      .simulate("change", { target: { value: "group" } });
    wrapper.find(".add-group-button").simulate("click");
    expect(wrapper.find(".add-group-input").props().value).toEqual("");
  });
});
