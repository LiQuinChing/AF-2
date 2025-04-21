import React from "react";

const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

const RegionFilter = ({ onChange }) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="mt-4 p-2 border rounded"
    >
      {regions.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
};

export default RegionFilter;
