import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function SearchBar({ setQuery }) {
  const [city, setCity] = useState("");
  const handleChange = (e) => {
    setCity(e.target.value);
  };
  const handleSearch = () => {
    if (city !== "") setQuery({ q: city });
    setCity("");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div>
      <div className="relative">
        <input
          type="text"
          className="text-sm py-2 px-5  rounded-full placeholder:text-sm focus:outline-none text-black "
          placeholder="Search location..."
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />

        <BiSearch
          size={22}
          className="cursor-pointer  text-black absolute right-2 top-2 hover:scale-110"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}
