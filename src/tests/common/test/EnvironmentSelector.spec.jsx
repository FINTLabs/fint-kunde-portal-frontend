import React from "react";
import { create } from "react-test-renderer";
import EnvironmentSelector from "../../../common/test/EnvironmentSelector";

describe("Enviornment selector", () => {
  const component = create(
    <EnvironmentSelector value="test" name="test" handleChange={() => {}} />
  );
  it("should match snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
