import "./App.css";
import { Route, Routes } from "react-router-dom";
import { EventPlanner, FarmerDashboard, WeatherHome } from "./pages";
import { Header } from "./components";
import { useEffect, useState } from "react";
import WeatherMap from "./components/WeatherDashboard/WeatherMap";
import { Toaster } from "react-hot-toast";
import { getFormattedData } from "./services/WeatherServices";

function App() {
  const [weather, setWeather] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: null, lon: null });
  const [unit, setUnit] = useState("metric");
  const [query, setQuery] = useState({ q: "" });

 
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });
          setQuery({ lat: latitude, lon: longitude }); 
        },
        (error) => {
          console.error("Error getting location: ", error);
          
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    
    }
  };

  const getWeather = async () => {
    try {
      const data = await getFormattedData({ ...query, unit });
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  useEffect(() => {
    if (userLocation.lat && userLocation.lon) {
      setQuery({ lat: userLocation.lat, lon: userLocation.lon }); 
    } else {
      getCurrentLocation(); 
    }
  }, [userLocation]);

  useEffect(() => {
    getWeather(); 
  }, [query, unit]);



  return (
    <div>
      <Header
        setUserLocation={setUserLocation}
        setQuery={setQuery}
        setUnit={setUnit}
        unit={unit}
      />
      <WeatherMap
        coordinates={userLocation}
        setCoordinates={setUserLocation}
        unit={unit}
        query={query}
      />
      <Routes>
        <Route path="/" index element={<WeatherHome weather={weather} unit={unit} />} />
        <Route path="/event-planner" element={<EventPlanner />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
