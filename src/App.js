import "./App.css";
import { Route, Routes } from "react-router-dom";
import { EventPlanner, WeatherHome } from "./pages";
import { AlertNotification, Button, Header, MapControls } from "./components";
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
  const [alerts, setAlerts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [layer, setLayer] = useState("");

  //custom hook to get Current location
  useCurrentLocation(setUserLocation, setQuery);
  // Getting formatted data from wetherservices
  const getWeather = async () => {
    try {
      const data = await getFormattedData({ ...query, unit });
      setWeather(data);
      setAlerts(data);
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

  // get alert for the severe wether condition

  useEffect(() => {
    if (alerts.name || alerts.detail || alerts.temp) {
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [alerts.name, alerts.detail, alerts.temp]);

  return (
    <div>
      <Header
        setUserLocation={setUserLocation}
        setQuery={setQuery}
        setUnit={setUnit}
        unit={unit}
      />
      <div className="relative">
        <WeatherMap
          weather={weather}
          coordinates={userLocation}
          setCoordinates={setUserLocation}
          unit={unit}
          layer={layer}
        />
        <div className="absolute top-4 right-4 z-[9999] space-y-3">
          <MapControls setLayer={setLayer} />
        </div>
      </div>
      {showAlert && <AlertNotification alerts={alerts} />}
      <Routes>
        <Route
          path="/"
          index
          element={<WeatherHome weather={weather} unit={unit} />}
        />
        <Route
          path="/event-planner"
          element={<EventPlanner weather={weather} unit={unit} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
