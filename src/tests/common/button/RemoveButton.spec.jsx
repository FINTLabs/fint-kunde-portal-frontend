import React from "react";
import { create } from "react-test-renderer";
import RemoveButton from "../../../common/button/RemoveButton";
describe("Feature component", () => {
  const component = create(<RemoveButton title="test" />);
  it("ishould match snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
