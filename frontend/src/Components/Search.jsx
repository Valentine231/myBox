import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="relative w-full max-w-md mx-auto mb-6">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className="w-full pl-10 pr-4 py-2 text-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
      />
    </div>
  );
};

export default SearchBar;
