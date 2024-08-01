import { formatToLocalTime } from "../utils/FormatDate";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = process.env.REACT_APP_WEATHER_API_URL;

const getWeatherData = async (infoType, searchParams) => {
  try {
    const url = new URL(BASE_URL + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching data: ${response.status} - ${response.statusText}`);
      console.error("Response text:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getWeatherData function:", error.message);
    throw error;
  }
};

const iconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatCurrentData = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    name,
    rain = {},
    dt,
    visibility,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);
  const rainAmount = rain["1h"] || 0;

  return {
    temp,
    feels_like,
    temp_max,
    temp_min,
    humidity,
    pressure,
    name,
    rain: rainAmount,
    visibility,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    speed,
    details,
    icon: iconUrl(icon),
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon,
  };
};

const formatForecastWeather = (secs, offset, data) => {
  const hourly = data
    .filter((f) => f.dt > secs)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrl(f.weather[0].icon),
      date: f.dt_txt,
      rain: f.rain ? f.rain["1h"] : 0,
    }))
    .slice(0, 6);

  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrl(f.weather[0].icon),
      date: f.dt_txt,
      rain: f.rain ? f.rain["1d"] : 0,
      details: f.weather[0].main
    }));

  return { hourly, daily };
};

const getFormattedData = async (searchParams) => {
  try {
    const formattedWeatherData = await getWeatherData("weather", searchParams)
      .then(formatCurrentData);

    const { dt, lat, lon, timezone } = formattedWeatherData;

    const formattedForecastedWeather = await getWeatherData("forecast", {
      lat,
      lon,
      units: searchParams.unit,
    }).then((data) => formatForecastWeather(dt, timezone, data.list));

    return { ...formattedWeatherData, ...formattedForecastedWeather };
  } catch (error) {
    console.error("Error in getFormattedData:", error.message);
    throw error;
  }
};

export { getFormattedData };
