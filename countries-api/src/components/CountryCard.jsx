import React from "react";
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  const { name, population, region, capital, flags, languages } = country;
  const langList = languages ? Object.values(languages).join(", ") : "N/A";

  return (
    <Link
      to={`/country/${country.cca3}`}
      className="block border rounded-lg shadow-md p-4 hover:bg-gray-100 transition"
    >
      <img
        src={flags?.png}
        alt={`Flag of ${name.common}`}
        className="w-full h-40 object-cover mb-2"
      />
      <h2 className="text-lg font-semibold">{name.common}</h2>
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
    </Link>
  );
};

export default CountryCard;
