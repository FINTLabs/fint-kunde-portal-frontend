import React from "react";
import ReactDOM from "react-dom";
import { create } from "react-test-renderer";
import TabContainer from "../../../common/tab/TabContainer";

describe("TabContainer", () => {
  const compoent = create(
    <TabContainer dir="left">
      <div />
    </TabContainer>
  );
  it("should match snapshot", () => {
    expect(compoent.toJSON).toMatchSnapshot();
  });
});
