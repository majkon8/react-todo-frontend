import React from "react";
import TaskSkeleton from "./TaskSkeleton";
import { shallow } from "enzyme";

describe("TaskSkeleton testing", () => {
  test("renders correctly", () => {
    const taskSkeleton = shallow(<TaskSkeleton />);
    expect(
      taskSkeleton.containsMatchingElement(
        <div className="task-skeleton">
          <div className="task-body-skeleton"></div>
        </div>
      )
    ).toEqual(true);
  });
});
