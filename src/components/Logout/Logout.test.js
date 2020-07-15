import React from "react";
import Logout from "./Logout";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

let initialStore = {};
let mockedStore = configureMockStore([thunk])(initialStore);

describe("Logout component testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        <Logout />
      </Provider>
    );
  });

  test("includes icon", () => {
    expect(
      wrapper.containsMatchingElement(
        <i
          title="Log out"
          class="logout-icon fa fa-sign-out"
          aria-hidden="true"
        ></i>
      )
    ).toEqual(true);
  });
});
