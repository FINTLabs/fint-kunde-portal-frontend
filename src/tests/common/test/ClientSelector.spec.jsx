import React from "react";
import { create } from "react-test-renderer";
import ClientSelector from "../../../common/test/ClientSelector";

describe("Client selector", () => {
  const component = create(
    <ClientSelector
      clients={[
        {
          dn: "cn=client1",
          shortDescription: "test1",
          assetId: "test.no"
        },
        {
          dn: "cn=client2",
          shortDescription: "test2",
          assetId: "test.no"
        }
      ]}
      handleChange={e => {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
      }}
      name="test"
      value="test"
    />
  );
  //const root = component.root;
  it("should match snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
  /*
  it("changes value when selector changes", () => {
    root.props.handleChange;

    expect(true).toBe(true);
  });
  */
});
