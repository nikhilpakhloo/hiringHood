import React from "react";
import toast from "react-hot-toast";
import { MdOutlineMyLocation } from "react-icons/md";

const Location = ({ setCoordinates }) => {
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setCoordinates({ lat: latitude, lon: longitude });
          toast.success(
            `Current location is : Lat: ${latitude} Lon: ${longitude}`
          );
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="">
      <button
        onClick={handleGetCurrentLocation}
        className="w-8 h-8 flex justify-center p-1 items-center bg-white text-black rounded-md cursor-pointer shadow-lg"
      >
        <MdOutlineMyLocation />
      </button>
    </div>
  );
};

export default Location;
