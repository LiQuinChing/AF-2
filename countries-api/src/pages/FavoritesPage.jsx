import React from "react";
import { useAuth } from "../context/AuthContext";

const FavoritesPage = () => {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p className="mt-2">
        This is your favorites page. (You can implement storing favorites here.)
      </p>
    </div>
  );
};

export default FavoritesPage;
