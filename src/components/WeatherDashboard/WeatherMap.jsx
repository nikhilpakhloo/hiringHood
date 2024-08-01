import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const WEATHER_API_URL = process.env.REACT_APP_WEATHER_API_URL;

const MapUpdater = ({ latitude, longitude }) => {
  const map = useMap();

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      map.flyTo([latitude, longitude], 13, {
        animate: true,
        duration: 2,
      });
    }
  }, [latitude, longitude, map]);

  return null;
};

const WeatherMap = ({
  coordinates,
  setCoordinates,
  unit,
  query,
  
}) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    if (!coordinates.lat || !coordinates.lon) return;

    setLoading(true);
    try {
      const response = await axios.get(`${WEATHER_API_URL}/weather`, {
        params: {
          lat: coordinates.lat,
          lon: coordinates.lon,
          appid: API_KEY,
          units: unit,
        },
      });
      setWeather(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data");
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Error getting current location");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported");
    }
  };
  useEffect(() => {
    fetchWeatherData();
  }, [coordinates, unit]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (!query.q || query.q.trim().length === 0) {
      setError("No location provided");
      return;
    }

    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${query.q}&limit=5&appid=${API_KEY}`
        );
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setCoordinates({ lat, lon });
          setError(null);
        } else {
          setError("City not found");
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        setError("Error fetching coordinates");
      }
    };

    fetchCoordinates();
  }, [query.q]);

  if (loading) {
    return <p>Loading weather data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ position: "relative", height: "450px", width: "100%" }}>
      <MapContainer
        center={[coordinates.lat || 0, coordinates.lon || 0]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <MapUpdater latitude={coordinates.lat} longitude={coordinates.lon} />

        {weather && (
          <Marker
            position={[coordinates.lat, coordinates.lon]}
            riseOnHover={true}
            autoPanOnFocus={true}
            icon={L.icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
            })}
          >
            <Popup position={[coordinates.lat, coordinates.lon]}>
              <div className="">
                <h2>Location: {weather.name}</h2>
                <p>Weather: {weather.weather[0].description}</p>
                <p>
                  Temperature:
                  {unit === "metric"
                    ? `${weather.main.temp}°C`
                    : `${weather.main.temp}°F`}{" "}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
