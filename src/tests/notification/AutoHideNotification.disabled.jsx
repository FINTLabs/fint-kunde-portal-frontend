import React from "react";
import { create } from "react-test-renderer";
import AutoHideNotification from "../../common/notification/AutoHideNotification";
describe("Feature component", () => {
  test("it matches the snapshot", () => {
    const component = create(
      <AutoHideNotification
        showNotification={true}
        message="test"
        onClose={() => {}}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});

