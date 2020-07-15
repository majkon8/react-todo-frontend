import React from "react";
import GroupSkeleton from "./GroupSkeleton";
import { shallow } from "enzyme";

describe("GroupSkeleton testing", () => {
  test("renders correctly", () => {
    const taskSkeleton = shallow(<GroupSkeleton />);
    expect(
      taskSkeleton.containsMatchingElement(
        <div className="group-skeleton">
          <div className="group-name-skeleton"></div>
        </div>
      )
    ).toEqual(true);
  });
});
