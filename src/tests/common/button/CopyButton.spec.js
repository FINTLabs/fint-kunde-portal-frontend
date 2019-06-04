import React from "react";
import { create } from "react-test-renderer";
import CopyButton from '../../../common/button/CopyButton';
describe("Feature component", () => {
  test("it matches the snapshot", () => {
    const component = create(<CopyButton/>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});