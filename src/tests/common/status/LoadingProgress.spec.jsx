import React from "react";
import { create } from "react-test-renderer";
import LoadingProgress from "../../../common/status/LoadingProgress";

describe("Feature component", () => {
  const component = create(<LoadingProgress color="primary" size={10} />);
  it("should match snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
