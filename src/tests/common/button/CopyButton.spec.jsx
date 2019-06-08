import React from "react";
import { create } from "react-test-renderer";
import CopyButton from "../../../common/button/CopyButton";
describe("Feature component", () => {
  const component = create(<CopyButton />);
  it("should match snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
