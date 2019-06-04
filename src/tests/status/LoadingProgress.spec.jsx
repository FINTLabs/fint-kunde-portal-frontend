import React from "react";
import { create } from "react-test-renderer";
import LoadingProgress from "../../common/status/LoadingProgress";
describe("Feature component", () => {
  test("it matches the snapshot", () => {
    const component = create(
      <LoadingProgress
        color="primary"
        size={10}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});