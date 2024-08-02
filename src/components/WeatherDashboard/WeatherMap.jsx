import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { marker } from "leaflet";
import { getFormattedData } from "../../services/WeatherServices";

const MapUpdater = ({ latitude, longitude }) => {
  const map = useMap();
  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      const currentCenter = map.getCenter();

      if (currentCenter.lat !== latitude || currentCenter.lng !== longitude) {
        map.flyTo([latitude, longitude], 13, {
          animate: true,
          duration: 2,
        });
      }
    }
  }, [latitude, longitude, map]);

  return null;
};
const WeatherMap = ({ coordinates, setCoordinates, unit, query }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const getWeather = async () => {
    try {
      const data = await getFormattedData({ ...query, unit });
      const lat = data.lat;
      const lon = data.lon;
      setCoordinates({ lat, lon });
    
      setWeather(data);
      setError(null);
   
   
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      setError("Error fetching weather data");
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, unit]);
 

  return (
    <div style={{ position: "relative", height: "450px", width: "100%" }}>
      {error && <p>{error}</p>}
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
            <Popup position={[coordinates.lat, coordinates.lon]} >
              <div>
                <h2>Location: {weather?.name}</h2>
                <p>Weather: {weather?.details}</p>
                <p>
                  Temperature:
                  {unit === "metric"
                    ? `${(weather.temp - 273.15).toFixed(1)}°C`
                    : `${(((weather.temp - 273.15) * 9) / 5 + 32).toFixed(
                        1
                      )}°F`}{" "}
                </p>
                <p>Pressure: {weather.pressure}</p>
                <p>Humidity: {weather.humidity}</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
