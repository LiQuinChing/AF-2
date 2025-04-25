import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import CountryCard from "../components/CountryCard";

const FavoritesPage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const key = `favorites_${user?.name}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Countries</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
