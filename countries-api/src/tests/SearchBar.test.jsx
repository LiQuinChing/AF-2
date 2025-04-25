import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar", () => {
  it("renders input and button", () => {
    render(<SearchBar onSearch={jest.fn()} />);
    expect(
      screen.getByPlaceholderText(/search countries/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("calls onSearch when typing", () => {
    jest.useFakeTimers();
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(/search countries/i);
    fireEvent.change(input, { target: { value: "Finland" } });
    jest.advanceTimersByTime(300);
    expect(onSearchMock).toHaveBeenCalledWith("Finland");
    jest.useRealTimers();
  });
});
