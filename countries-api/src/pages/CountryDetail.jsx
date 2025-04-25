import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCountryByCode } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const CountryDetail = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [country, setCountry] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getCountryByCode(code).then((res) => {
      const data = res[0];
      setCountry(data);

      // Check if already marked as favorite
      const saved = localStorage.getItem(`favorites_${user?.name}`);
      if (saved) {
        const favorites = JSON.parse(saved);
        setIsFavorite(favorites.some((c) => c.cca3 === data.cca3));
      }
    });
  }, [code, user]);

  const toggleFavorite = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "User must log in to mark favorite",
        showConfirmButton: true,
        confirmButtonText: "Go to Login",
        customClass: {
          confirmButton:
            "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700",
        },
        buttonsStyling: false,
      }).then(() => {
        navigate("/login");
      });
      return;
    }
    const key = `favorites_${user.name}`;
    let favorites = JSON.parse(localStorage.getItem(key)) || [];

    if (isFavorite) {
      favorites = favorites.filter((c) => c.cca3 !== country.cca3);
    } else {
      favorites.push(country);
    }

    localStorage.setItem(key, JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  if (!country) return <div className="p-4">Loading...</div>;

  const { name, flags, capital, population, region, languages } = country;
  const langList = languages ? Object.values(languages).join(", ") : "N/A";

  return (
    <div className="p-6 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden relative">
        <img
          src={flags?.png}
          alt={name.common}
          className="w-full h-56 object-cover"
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{name.common}</h2>
          <p>
            <strong>Capital:</strong> {capital ? capital[0] : "N/A"}
          </p>
          <p>
            <strong>Region:</strong> {region}
          </p>
          <p>
            <strong>Population:</strong> {population.toLocaleString()}
          </p>
          <p>
            <strong>Languages:</strong> {langList}
          </p>
        </div>
        <div className="absolute bottom-4 right-4">
          <button onClick={toggleFavorite}>
            <i
              className={`fas fa-heart text-2xl transition ${
                isFavorite ? "text-red-600" : "text-gray-400"
              }`}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
