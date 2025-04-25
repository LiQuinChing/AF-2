import React, { useEffect, useState } from "react";
import {
  getAllCountries,
  getCountryByName,
  getCountriesByRegion,
} from "../services/api";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";
import RegionFilter from "../components/RegionFilter";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllCountries().then(setCountries);
  }, []);

  const handleSearch = async (name) => {
    if (!name) {
      getAllCountries().then(setCountries);
      setError(null);
      return;
    }
    try {
      const result = await getCountryByName(name);
      setCountries(result);
      setError(null);
    } catch (err) {
      setCountries([]);
      setError("Country not found.");
    }
  };

  const handleRegionChange = (region) => {
    if (region === "All") {
      getAllCountries().then(setCountries);
    } else {
      getCountriesByRegion(region).then(setCountries);
    }
  };

  return (
    <div className="p-4">
      <SearchBar onSearch={handleSearch} />
      <RegionFilter onChange={handleRegionChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {error ? (
          <p className="col-span-full text-center text-red-600 font-semibold text-lg">
            {error}
          </p>
        ) : (
          countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
