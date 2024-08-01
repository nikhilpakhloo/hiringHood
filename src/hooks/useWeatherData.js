import { useState, useEffect } from 'react';
import { fetchCurrentWeather } from '../services/WeatherServices';

const useWeatherData = (location) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeatherData = async () => {
      setLoading(true);
      try {
        const result = await fetchCurrentWeather(location);
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, [location]);

  return { data, error, loading };
};

export default useWeatherData;
