import React from "react";
import { create } from "react-test-renderer";
import UsernameValidationInput from "../../../common/input-validation/UsernameValidationInput";
describe("Feature component", () => {
  const component = create(
    <UsernameValidationInput
      name="test"
      className="test"
      title="test"
      usernameIsValid={() => {}}
      onChange={() => {}}
    />
  );
  it("should match snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
