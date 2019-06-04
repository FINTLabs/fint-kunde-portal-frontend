import React from "react";
import { create } from "react-test-renderer";
import OpenDataLabel from "../../common/label/OpenDataLabel";
describe("Feature component", () => {
  test("it matches the snapshot", () => {
    const component = create(<OpenDataLabel/>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});