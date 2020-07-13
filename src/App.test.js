import React from "react";
import App from "./App";
import { shallow } from 'enzyme';

describe("App testing", () => {
  test("renders without crashing", () => {
    shallow(<App />)
  });
});
