import React from "react";
import { create } from "react-test-renderer";
import AddButton from "../../../common/button/AddButton";
describe("Feature component", () => {
  test("it matches the snapshot", () => {
    const component = create(<AddButton title="test"/>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});