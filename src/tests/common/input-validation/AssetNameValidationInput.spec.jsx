import React from "react";
import { create } from "react-test-renderer";
import AssetNameValidationInput from "../../../common/input-validation/AssetNameValidationInput";
describe("Feature component", () => {
  const component = create(
    <AssetNameValidationInput
      name="test"
      className="test"
      title="test"
      assetNameIsValid={() => {}}
      onChange={() => {}}
    />
  );
  it("should match snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
