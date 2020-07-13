import React from "react";
import Form from "./Form";
import { shallow } from "enzyme";

describe("Testing form component", () => {
  let form;
  beforeEach(() => {
    form = shallow(<Form />);
  });

  test("includes email and password input", () => {
    expect(
      form.containsAllMatchingElements([
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
      form.containsMatchingElement(
        <button className="submit-button" type="submit">
          Send
        </button>
      )
    ).toEqual(true);
  });

  test("includes login/signup switch", () => {
    expect(
      form.containsAllMatchingElements([
        <div className="form-switch-login">Log in</div>,
        <div className="form-switch-signup">Sign up</div>,
      ])
    );
  });

  test("value of email and password inputs are ''", () => {
    expect(form.find("#email").props().value).toEqual("");
    expect(form.find("#password").props().value).toEqual("");
  });

  test("switching between login/signup form works", () => {
    form.find(".form-switch-signup").simulate("click");
    expect(
      form.containsMatchingElement(
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
    expect(form.find("#confirm-password").props().value).toEqual("");
    form.find(".form-switch-login").simulate("click");
    expect(
      form.containsMatchingElement(
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
    expect(form.find(".submit-button").props().disabled).toEqual(true);
    form.find("#email").simulate("change", { target: { value: "email" } });
    expect(form.find(".submit-button").props().disabled).toEqual(true);
    form
      .find("#password")
      .simulate("change", { target: { value: "password" } });
    expect(form.find(".submit-button").props().disabled).toEqual(false);
    form.find(".form-switch-signup").simulate("click");
    expect(form.find(".submit-button").props().disabled).toEqual(true);
    form
      .find("#confirm-password")
      .simulate("change", { target: { value: "confirm" } });
    expect(form.find(".submit-button").props().disabled).toEqual(false);
    expect(form.find("#email").props().value).toEqual("email");
    expect(form.find("#password").props().value).toEqual("password");
    expect(form.find("#confirm-password").props().value).toEqual("confirm");
  });

  test("doesn't include error nor success message", () => {
    expect(form.find(".message").exists()).toEqual(false);
  });

  test("shows error messages on submit", () => {
    form.find(".form-switch-signup").simulate("click");
    form.find("#email").simulate("change", { target: { value: "test@test" } });
    form
      .find("#password")
      .simulate("change", { target: { value: "password" } });
    form
      .find("#confirm-password")
      .simulate("change", { target: { value: "confirm" } });
    const event = { preventDefault: () => {} };
    jest.spyOn(event, "preventDefault");
    form.simulate("submit", event);
    expect(form.find(".error-message").text()).toEqual(
      "Invalid email adddress"
    );
    form
      .find("#email")
      .simulate("change", { target: { value: "test@test.com" } });
    form.simulate("submit", event);
    expect(form.find(".error-message").text()).toEqual("Password too weak");
    form
      .find("#password")
      .simulate("change", { target: { value: "Password.123" } });
    form.simulate("submit", event);
    expect(form.find(".error-message").text()).toEqual("Passwords must match");
    form
      .find("#confirm-password")
      .simulate("change", { target: { value: "Password.123" } });
    form.simulate("submit", event);
    expect(form.find(".error-message").exists()).toEqual(false);
  });
});
