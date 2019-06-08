import React from "react";
import { create } from "react-test-renderer";
import AddButton from "../../../common/button/AddButton";
describe("Feature component", () => {
  const component = create(<AddButton title="test" />);
  it("should match snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
