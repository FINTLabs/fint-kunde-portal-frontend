import React from "react";
import { create } from "react-test-renderer";
import TrafficLight from "../../../common/status/TrafficLight";

describe("TrafficLight with status FAILED", () => {
  const component = create(<TrafficLight status="FAILED" />);
  it("has className containing failed", () => {
    expect(component.root.findByType("span").props.className).toContain(
      "-failed-"
    );
  });
});

describe("TrafficLight with status OK", () => {
  const component = create(<TrafficLight status="OK" />);
  it("has className containing ok", () => {
    expect(component.root.findByType("span").props.className).toContain("-ok-");
  });
});

describe("TrafficLight with status PARTIALLY_FAILED", () => {
  const component = create(<TrafficLight status="PARTIALLY_FAILED" />);
  it("has className containing partially_failed", () => {
    expect(component.root.findByType("span").props.className).toContain(
      "-partiallyFailed-"
    );
  });
});

describe("TrafficLight with status RUNNING", () => {
  const component = create(<TrafficLight status="RUNNING" />);
  it("is of element type circle", () => {
    expect(component.root.findByType("circle")).toBeDefined();
  });
});

describe("Component", () => {
  const component = create(<TrafficLight status="RUNNING" />);
  it("should match snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
