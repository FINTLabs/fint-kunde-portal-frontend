import React from "react";
import { create } from "react-test-renderer";
import OpenDataLabel from "../../../common/label/OpenDataLabel";

describe("Feature component", () => {
  const component = create(<OpenDataLabel />);
  it("should match snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
