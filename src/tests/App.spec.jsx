import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { create } from "react-test-renderer";

describe("App ", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });

  it("should match snapshot", () => {
    const app = create(<App />);
    expect(app.toJSON()).toMatchSnapshot();
  });
});
