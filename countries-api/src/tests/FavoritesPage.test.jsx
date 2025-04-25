import React from "react";
import { render, screen } from "@testing-library/react";
import FavoritesPage from "../pages/FavoritesPage";
//import { AuthContext } from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import * as AuthContextModule from "../context/AuthContext";

//Mock a user and their favorites
const mockUser = { name: "testuser" };

const mockFavoriteCountries = [
  {
    cca3: "FIN",
    name: { common: "Finland" },
    population: 5536146,
    region: "Europe",
    capital: ["Helsinki"],
    flags: { png: "https://flagcdn.com/w320/fi.png" },
    languages: { fin: "Finnish" },
  },
];

describe("Favorites Page Integration", () => {
  beforeEach(() => {
    localStorage.setItem(
      `favorites_${mockUser.name}`,
      JSON.stringify(mockFavoriteCountries)
    );
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("renders favorite countries for logged-in user", () => {
    jest
      .spyOn(AuthContextModule, "useAuth")
      .mockReturnValue({ user: mockUser });
    render(
      <BrowserRouter>
        <FavoritesPage />
      </BrowserRouter>
    );

    expect(screen.getByText("Your Favorite Countries")).toBeInTheDocument();
    expect(screen.getByText(/Finland/i)).toBeInTheDocument();
    expect(screen.getByText(/Helsinki/i)).toBeInTheDocument();
  });
});
