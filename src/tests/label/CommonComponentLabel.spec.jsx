import React from "react";
import { create } from "react-test-renderer";
import CommonComponentLabel from "../../common/label/CommonComponentLabel";
describe("Feature component", () => {
  test("it matches the snapshot", () => {
    const component = create(<CommonComponentLabel/>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});