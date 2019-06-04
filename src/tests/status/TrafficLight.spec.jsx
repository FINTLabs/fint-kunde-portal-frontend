import React from "react";
import { create } from "react-test-renderer";
import TrafficLight from "../../common/status/TrafficLight";

describe("TrafficLight with status FAILED", () => {
  it("has className containing failed", () => {
    const component = create(<TrafficLight status="FAILED" />);
    expect(component.root.findByType("span").props.className).toContain(
      "-failed-"
    );
  });
});

describe("TrafficLight with status OK", () => {
  it("has className containing ok", () => {
    const component = create(<TrafficLight status="OK" />);
    expect(component.root.findByType("span").props.className).toContain("-ok-");
  });
});

describe("TrafficLight with status PARTIALLY_FAILED", () => {
  it("has className containing partially_failed", () => {
    const component = create(<TrafficLight status="PARTIALLY_FAILED" />);
    expect(component.root.findByType("span").props.className).toContain(
      "-partiallyFailed-"
    );
  });
});

describe("TrafficLight with status RUNNING", () => {
  it("is of element type circle", () => {
    const component = create(<TrafficLight status="RUNNING" />);
    expect(component.root.findByType("circle")).toBeDefined();
  });
});

describe("Component", () => {
  const component = create(<TrafficLight status="RUNNING" />);
  it("should match snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

});
