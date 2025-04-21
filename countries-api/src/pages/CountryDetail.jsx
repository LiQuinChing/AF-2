import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCountryByCode } from "../services/api";

const CountryDetail = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    getCountryByCode(code).then((res) => setCountry(res[0]));
  }, [code]);

  if (!country) return <div>Loading...</div>;

  const { name, flags, capital, population, region, languages } = country;
  const langList = languages ? Object.values(languages).join(", ") : "N/A";

  return (
    <div className="p-4">
      <img
        src={flags?.png}
        alt={`Flag of ${name.common}`}
        className="w-64 h-auto mb-4"
      />
      <h1 className="text-2xl font-bold">{name.common}</h1>
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
  );
};

export default CountryDetail;
