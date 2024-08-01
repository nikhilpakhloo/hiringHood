import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UnitToggle, Location, SearchBar } from "../../components";

const Header = ({ userLocation, setUserLocation, ...props }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-blue-800 text-white shadow-md">
      <nav className="container mx-auto flex flex-wrap items-center justify-between p-4">
        <div className="flex items-center space-x-4 ">
          <Link
            to="/"
            className="text-3xl uppercase font-extrabold hover:text-blue-300 transition duration-300"
          >
            Weather App
          </Link>
        </div>

        <div
          className={`lg:flex lg:items-center lg:justify-center lg:space-x-4 ${
            isMenuOpen ? "block" : "hidden"
          } transition-transform duration-300`}
        >
          <Link
            to="/"
            className="block lg:inline-block hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/event-planner"
            className="block lg:inline-block hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Event Planner
          </Link>
          <Link
            to="/farmer-dashboard"
            className="block lg:inline-block hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Farmer Planner
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <SearchBar setQuery={props.setQuery} />
          <Location setCoordinates={setUserLocation}  />
          <UnitToggle setUnit={props.setUnit} unit={props.unit} />
        </div>

        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default Header;
