import React from "react";
import { create } from "react-test-renderer";
import AssetNameValidationInput from "../../common/input-validation/AssetNameValidationInput";
describe("Feature component", () => {
  test("it matches the snapshot", () => {
    const component = create(
      <AssetNameValidationInput
        name="test"
        className="test"
        title="test"
        assetNameIsValid={()=>{}}
        onChange={()=>{}}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
