import React from "react";
import Groups from "./Groups";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

let initialStore = {
  data: { groups: [] },
  UI: { loading: false, error: null, success: null },
};
let mockedStore = configureMockStore([thunk])(initialStore);

describe("Groups testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        <Groups />
      </Provider>
    );
  });

  test("includes groups container", () => {
    expect(wrapper.find(".groups-container").exists()).toEqual(true);
  });
});
