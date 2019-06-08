import React from "react";
import { create } from "react-test-renderer";
import CommonComponentLabel from "../../../common/label/CommonComponentLabel";

describe("Feature component", () => {
  const component = create(<CommonComponentLabel />);
  it("should match snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
