import React from "react";
import { create } from "react-test-renderer";
import ComponentSelector from "../../../common/test/ComponentSelector";

describe("Component selector", () => {
  const component = create(
    <ComponentSelector
      name="test"
      value="test"
      components={[
        {
          dn: "cn=comp1",
          basePath: "/comp1",
          desciption: "Comp 1"
        },
        {
          dn: "cn=comp2",
          basePath: "/comp2",
          desciption: "Comp 2"
        }
      ]}
      handleChange={() => {}}
    />
  );

  it("should match snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
