import React from "react";
import MainPage from "./MainPage";
import { shallow } from "enzyme";

describe("Main page testing", () => {
  const mainPage = shallow(<MainPage />);
  test("includes group and tasks panels", () => {
    expect(mainPage.find(".group-panel").exists()).toEqual(true);
    expect(mainPage.find(".task-panel").exists()).toEqual(true);
  });
});
