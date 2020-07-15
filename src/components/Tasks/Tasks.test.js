import React from "react";
import Tasks from "./Tasks";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

let initialStore = {
  data: { tasks: [] },
  UI: { loading: false, error: null, success: null },
};
let mockedStore = configureMockStore([thunk])(initialStore);

describe("Tasks testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        <Tasks />
      </Provider>
    );
  });

  test("includes tasks container", () => {
    expect(
      wrapper.containsMatchingElement(<div className="tasks-container"></div>)
    ).toEqual(true);
  });
});
