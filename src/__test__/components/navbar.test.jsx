/**
 * TEST SCENARIO
 *  - Navbar should be rendered
 *  - should render the component and display user info when authenticated
 */

import { cleanup, render, screen } from "@testing-library/react";
import { describe, afterEach, it, expect } from "vitest";
import { createStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "../../components/Navbar";

const reducer = (state = { authUser: null }, action) => {
  switch (action.type) {
    case "SET_AUTH_USER":
      return { ...state, authUser: action.payload };
    case "UNSET_AUTH_USER":
      return { ...state, authUser: null };
    default:
      return state;
  }
};

// Mock store creation
const store = createStore(reducer);

describe("Navbar Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("Should render Navbar properly", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Echo/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
  });

  it("should render the component and display user info when authenticated", () => {
    store.dispatch({
      type: "SET_AUTH_USER",
      payload: { name: "Test User", avatar: "/test-avatar.png" },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Hi, Test User!/i)).toBeInTheDocument();
    expect(screen.getByAltText(/profile-image/i)).toHaveAttribute("src", "/test-avatar.png");
  });
});
