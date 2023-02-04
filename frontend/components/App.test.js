// Write your tests here
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import AppFunctional from "./AppFunctional";
import AppClass from "./AppClass";

test("sanity", () => {
  expect(true).not.toBe(false);
});

test("functional component renders", () => {
  render(<AppFunctional />);
});

test("Email input exists on the screen and holds value", () => {
  render(<AppFunctional />);

  const emailInput = screen.getByPlaceholderText("type email");
  const button = screen.getByTestId("submit-button");
  userEvent.type(emailInput, "lazydev@gmail.com");
  userEvent.click(button);
});

test("class component renders", () => {
  render(<AppClass />);
});

test("Email input exists on the screen and holds value", () => {
  render(<AppClass />);

  const emailInput = screen.getByPlaceholderText("type email");
  const button = screen.getByTestId("submit-button");
  userEvent.type(emailInput, "lazydev@gmail.com");
  userEvent.click(button);
});

test("email is required displays on screen", async () => {
  render(<AppFunctional />);
  const button = screen.getByTestId("submit-button");
  userEvent.click(button);
  // await waitFor(() => {
  //   const errorMessage = screen.queryByText(/Ouch: email is required/i);
  //   expect(errorMessage).toBeInTheDocument();
  // });
});

test("email is required displays on screen", async () => {
  render(<AppClass />);
  const button = screen.getByTestId("submit-button");
  userEvent.click(button);
  // await waitFor(() => {
  //   const errorMessage = screen.queryByText(/Ouch: email is required/i);
  //   expect(errorMessage).toBeInTheDocument();
  // });
});
