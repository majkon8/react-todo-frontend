import React from "react";
import Form from "./Form";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const initialStore = { UI: { loading: false, error: null, success: null } };
const mockedStore = configureMockStore([thunk])(initialStore);

const mountWithProvider = (children) => (store = mockedStore) =>
  mount(<Provider store={store}>{children}</Provider>);

describe("Testing form component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithProvider(<Form />)();
  });
  test("includs form component", () => {
    expect(wrapper.find("form").exists()).toEqual(true);
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

  test("includes submit button", () => {
    expect(
      wrapper.containsMatchingElement(
        <button className="submit-button" type="submit">
          Send
        </button>
      )
    ).toEqual(true);
  });

  test("includes login/signup switch", () => {
    expect(
      wrapper.containsAllMatchingElements([
        <div className="form-switch-login">Log in</div>,
        <div className="form-switch-signup">Sign up</div>,
      ])
    );
  });

  test("value of email and password inputs are ''", () => {
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
});
