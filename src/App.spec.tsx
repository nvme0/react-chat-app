import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders hello world text", () => {
  render(<App />);
  const helloWorldText = screen.getByText(/Hello, World!/i);
  expect(helloWorldText).toBeInTheDocument();
});
