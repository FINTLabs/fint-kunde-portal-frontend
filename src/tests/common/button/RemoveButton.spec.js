import React from "react";
import { create } from "react-test-renderer";
import RemoveButton from "../../../common/button/RemoveButton";
describe("Feature component", () => {
  test("it matches the snapshot", () => {
    const component = create(<RemoveButton title="test"/>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});