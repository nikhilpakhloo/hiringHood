import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UnitToggle, Location, SearchBar } from "../../components";
import Hamurger from "./Hamurger";

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

        <div className="flex items-center space-x-4 flex-wrap ">
          <SearchBar setQuery={props.setQuery} />
          <Location setCoordinates={setUserLocation} />
          <UnitToggle setUnit={props.setUnit} unit={props.unit} />
          <Hamurger toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}/>
         
        </div>
      </nav>
    </header>
  );
};

export default Header;
