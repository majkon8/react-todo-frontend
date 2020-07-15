import React from "react";
import Form from "./Form";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

let initialStore = { UI: { loading: false, error: null, success: null } };
let mockedStore = configureMockStore([thunk])(initialStore);

describe("Testing form component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        <Form />
      </Provider>
    );
  });

  test("includes form", () => {
    expect(wrapper.find("form").exists()).toEqual(true);
  });

  test("includes email and password input", () => {
    expect(
      wrapper.containsAllMatchingElements([
        <input
          className="input"
          type="email"
          name="email"
          id="email"
          placeholder="Type your email..."
          required
        />,
        <input
          className="input"
          type="password"
          name="password"
          id="password"
          placeholder="Type your password..."
          required
        />,
      ])
    ).toEqual(true);
  });

  test("includes submit button and doesn't include loading spinner", () => {
    expect(
      wrapper.containsMatchingElement(
        <button className="submit-button" type="submit">
          Send
        </button>
      )
    ).toEqual(true);
    expect(
      wrapper.containsMatchingElement(
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )
    ).toEqual(false);
  });

  test("includes login/signup switch", () => {
    expect(
      wrapper.containsAllMatchingElements([
        <div className="form-switch-login">Log in</div>,
        <div className="form-switch-signup">Sign up</div>,
      ])
    );
  });

  test("initial value of email and password inputs are ''", () => {
    expect(wrapper.find("#email").props().value).toEqual("");
    expect(wrapper.find("#password").props().value).toEqual("");
  });

  test("switching between login/signup form works", () => {
    wrapper.find(".form-switch-signup").simulate("click");
    expect(
      wrapper.containsMatchingElement(
        <input
          className="input"
          type="password"
          name="confirm-password"
          id="confirm-password"
          placeholder="Confirm your password..."
          required
        />
      )
    ).toEqual(true);
    expect(wrapper.find("#confirm-password").props().value).toEqual("");
    wrapper.find(".form-switch-login").simulate("click");
    expect(
      wrapper.containsMatchingElement(
        <input
          className="input"
          type="password"
          name="confirm-password"
          id="confirm-password"
          placeholder="Confirm your password..."
          required
        />
      )
    ).toEqual(false);
  });

  test("typing in inputs and submit button disabling works", () => {
    expect(wrapper.find(".submit-button").props().disabled).toEqual(true);
    wrapper.find("#email").simulate("change", { target: { value: "email" } });
    expect(wrapper.find(".submit-button").props().disabled).toEqual(true);
    wrapper
      .find("#password")
      .simulate("change", { target: { value: "password" } });
    expect(wrapper.find(".submit-button").props().disabled).toEqual(false);
    wrapper.find(".form-switch-signup").simulate("click");
    expect(wrapper.find(".submit-button").props().disabled).toEqual(true);
    wrapper
      .find("#confirm-password")
      .simulate("change", { target: { value: "confirm" } });
    expect(wrapper.find(".submit-button").props().disabled).toEqual(false);
    expect(wrapper.find("#email").props().value).toEqual("email");
    expect(wrapper.find("#password").props().value).toEqual("password");
    expect(wrapper.find("#confirm-password").props().value).toEqual("confirm");
  });

  test("doesn't include error nor success message", () => {
    expect(wrapper.find(".message").exists()).toEqual(false);
  });

  test("shows error messages on submit", () => {
    wrapper.find(".form-switch-signup").simulate("click");
    wrapper
      .find("#email")
      .simulate("change", { target: { value: "test@test" } });
    wrapper
      .find("#password")
      .simulate("change", { target: { value: "password" } });
    wrapper
      .find("#confirm-password")
      .simulate("change", { target: { value: "confirm" } });
    const event = { preventDefault: () => {} };
    jest.spyOn(event, "preventDefault");
    wrapper.find("form").simulate("submit", event);
    expect(wrapper.find(".error-message").text()).toEqual(
      "Invalid email adddress"
    );
    wrapper
      .find("#email")
      .simulate("change", { target: { value: "test@test.com" } });
    wrapper.find("form").simulate("submit", event);
    expect(wrapper.find(".error-message").text()).toEqual("Password too weak");
    wrapper
      .find("#password")
      .simulate("change", { target: { value: "Password.123" } });
    wrapper.find("form").simulate("submit", event);
    expect(wrapper.find(".error-message").text()).toEqual(
      "Passwords must match"
    );
    wrapper
      .find("#confirm-password")
      .simulate("change", { target: { value: "Password.123" } });
    wrapper.find("form").simulate("submit", event);
    expect(wrapper.find(".error-message").exists()).toEqual(false);
  });

  test("shows loading spinner on submit buttton when UI loads", () => {
    initialStore = { UI: { loading: true, error: null, success: null } };
    mockedStore = configureMockStore([thunk])(initialStore);
    wrapper = mount(
      <Provider store={mockedStore}>
        <Form />
      </Provider>
    );
    expect(
      wrapper.containsMatchingElement(
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )
    ).toEqual(true);
    expect(wrapper.find(".submit-button").text()).not.toEqual("Send");
  });

  test("errors and successes from redux are showing up", () => {
    initialStore = {
      UI: { loading: false, error: "Error message", success: null },
    };
    mockedStore = configureMockStore([thunk])(initialStore);
    wrapper = mount(
      <Provider store={mockedStore}>
        <Form />
      </Provider>
    );
    expect(wrapper.find(".error-message").text()).toEqual("Error message");
    expect(wrapper.find(".success-message").exists()).toEqual(false);
    initialStore = {
      UI: { loading: false, error: null, success: "Success message" },
    };
    mockedStore = configureMockStore([thunk])(initialStore);
    wrapper = mount(
      <Provider store={mockedStore}>
        <Form />
      </Provider>
    );
    expect(wrapper.find(".error-message").exists()).toEqual(false);
    expect(wrapper.find(".success-message").text()).toEqual("Success message");
  });
});
