import React from "react";
import toast from "react-hot-toast";

const UnitToggle = ({ setUnit, unit }) => {
  const handleUnitChange = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
    toast.success(`Unit changed to ${unit === "metric" ? "imperial" : "metric"}` )

  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleUnitChange}
        className={`w-5 h-5 p-4 flex items-center justify-center rounded-lg transition duration-300 bg-white hover:bg-gray-300 text-black shadow-lg `}
      >
        <p className="capitalize text-md">{unit === "metric" ? "°C" : "°F"}</p>
      </button>
    </div>
  );
};

export default UnitToggle;
