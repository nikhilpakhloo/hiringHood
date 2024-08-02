import "./App.css";
import { Route, Routes } from "react-router-dom";
import { EventPlanner, FarmerDashboard, WeatherHome } from "./pages";
import { Header } from "./components";
import { useEffect, useState } from "react";
import WeatherMap from "./components/WeatherDashboard/WeatherMap";
import { Toaster } from "react-hot-toast";
import { getFormattedData } from "./services/WeatherServices";
import useCurrentLocation from "./hooks/useCurrentLocation";

function App() {
  const [weather, setWeather] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: null, lon: null });
  const [unit, setUnit] = useState("metric");
  const [query, setQuery] = useState({ q: "" });

  useCurrentLocation(setUserLocation, setQuery);

  const getWeather = async () => {
    try {
      const data = await getFormattedData({ ...query, unit });
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  useEffect(() => {
    if (!userLocation.lat && !userLocation.lon) return;

    setUserLocation({ lat: userLocation.lat, lon: userLocation.lon });
    setQuery({ lat: userLocation.lat, lon: userLocation.lon });
  }, [setUserLocation]);

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
        setQuery={setQuery}
      />
      <Routes>
        <Route
          path="/"
          index
          element={<WeatherHome weather={weather} unit={unit} />}
        />
        <Route path="/event-planner" element={<EventPlanner  weather={weather} unit={unit}  />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
