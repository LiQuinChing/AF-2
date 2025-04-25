import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import * as api from "../services/api";

jest.mock("../services/api");

describe("Home", () => {
  it("renders countries from API", async () => {
    api.getAllCountries.mockResolvedValue([
      {
        cca3: "FIN",
        name: { common: "Finland" },
        population: 5500000,
        region: "Europe",
        capital: ["Helsinki"],
        flags: { png: "https://flagcdn.com/w320/fi.png" },
        languages: { fin: "Finnish" },
      },
    ]);

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/finland/i)).toBeInTheDocument()
    );
  });
});
