import { WeatherDashboard } from "../components";

export default function WeatherHome({weather, unit}) {
  return (
    <div>
      <WeatherDashboard weather={weather} unit={unit} />
    </div>
  );
}
