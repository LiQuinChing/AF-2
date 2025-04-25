import React, { useState, useEffect } from "react";
import debounce from "lodash/debounce"; // install lodash: npm install lodash

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  // Debounced search
  const debouncedSearch = debounce((query) => {
    onSearch(query);
  }, 300); // 300ms debounce

  useEffect(() => {
    if (input === "") {
      onSearch(""); // Reset to all countries
    } else {
      debouncedSearch(input);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
      <input
        type="text"
        placeholder="Search countries..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow p-2 border rounded shadow"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
