import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiSearch } from "react-icons/bi";

export default function SearchBar({ setQuery }) {
  const [city, setCity] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      setQuery({ q: city });
      toast.loading("Fetching the Location",{
        duration: 2000,
      })
      setCity(""); 
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      handleSearch();
    }
  };

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          className="text-sm py-2 px-5 rounded-full placeholder:text-sm focus:outline-none text-black"
          placeholder="Search location..."
          value={city} 
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <BiSearch
          size={22}
          className="cursor-pointer text-black absolute right-2 top-2 hover:scale-110"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}
