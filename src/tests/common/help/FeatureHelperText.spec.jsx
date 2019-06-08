import React from "react";
import { create } from "react-test-renderer";
import FeatureHelperText from "../../../common/help/FeatureHelperText";
describe("Feature component", () => {
  const component = create(
    <FeatureHelperText show={true}>Test</FeatureHelperText>
  );
  it("should match snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
