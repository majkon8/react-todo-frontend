import React from "react";
import WelcomePage from "./WelcomePage";
import { shallow } from "enzyme";
import todoImage from "../../assets/todoImage.jpg";

describe("WelcomePage testing", () => {
  let welcomePage;
  beforeEach(() => {
    welcomePage = shallow(<WelcomePage />);
  });

  test("includes image", () => {
    expect(
      welcomePage.containsMatchingElement(
        <img className="todo-image" src={todoImage} alt="todo" />
      )
    ).toEqual(true);
  });
});
