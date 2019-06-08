import React from "react";
import { create } from "react-test-renderer";
import AutoHideNotification from "../../../common/notification/AutoHideNotification";
describe("Feature component", () => {
  const component = create(
    <AutoHideNotification
      showNotification={true}
      message="test"
      onClose={() => {}}
    />
  );
  it("should match snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});

