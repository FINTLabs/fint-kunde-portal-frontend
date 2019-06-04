import React from "react";
import { create } from "react-test-renderer";
import FeatureHelperText from "../../common/help/FeatureHelperText";
describe("Feature component", () => {
  test("it matches the snapshot", () => {
    const component = create(<FeatureHelperText show={true}>Test</FeatureHelperText>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});