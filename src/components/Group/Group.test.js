import React from "react";
import Group from "./Group";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

let initialStore = { data: { selectedGroup: null } };
let mockedStore = configureMockStore([thunk])(initialStore);

describe("Group component testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        <Group name="group" groupId={1} />
      </Provider>
    );
  });

  test("includes .group div", () => {
    expect(wrapper.find(".group").exists()).toEqual(true);
  });

  test("displays group name", () => {
    expect(wrapper.find(".group-name").text()).toEqual("group");
  });
});
