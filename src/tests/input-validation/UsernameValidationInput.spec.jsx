import React from "react";
import { create } from "react-test-renderer";
import UsernameValidationInput from "../../common/input-validation/UsernameValidationInput";
describe("Feature component", () => {
  test("it matches the snapshot", () => {
    const component = create(
      <UsernameValidationInput
        name="test"
        className="test"
        title="test"
        usernameIsValid={()=>{}}
        onChange={()=>{}}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
