import React, { useState, useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  getRandomTask,
  warmWeatherTasks,
  mildWeatherTasks,
  coolWeatherTasks,
} from "./randomTask";

const memoizedGetRandomTask = {};
const getActivitySuggestions = (forecast) => {
  if (!forecast) return [];
  const activities = [];

  forecast.forEach((hourly) => {
    const { title, temp, date, icon } = hourly;
    let task;

    if (temp > 20) {
      if (!memoizedGetRandomTask.warm) {
        memoizedGetRandomTask.warm = getRandomTask(warmWeatherTasks);
      }
      task = memoizedGetRandomTask.warm;
      activities.push({
        text: `<span>${task} at <b>${title}</b>. Enjoy the sunshine!</span>`,
        __html: activities.text,
        icon: icon,
        bgColor: "bg-green-100",
      });
    } else if (temp > 15) {
      if (!memoizedGetRandomTask.mild) {
        memoizedGetRandomTask.mild = getRandomTask(mildWeatherTasks);
      }
      task = memoizedGetRandomTask.mild;
      activities.push({
        text: `<span>${task} at <b>${title}</b>. Embrace the mild breeze!</span>`,
        __html: activities.text,

        icon: icon,
        bgColor: "bg-blue-100",
      });
    } else {
      if (!memoizedGetRandomTask.cool) {
        memoizedGetRandomTask.cool = getRandomTask(coolWeatherTasks);
      }
      task = memoizedGetRandomTask.cool;
      activities.push({
        text: `<span>${task} at <b>${title}</b>. Stay indoor Stay warm!</span>`,
        __html: activities.text,
        icon: icon,
        bgColor: "bg-violet-100",
      });
    }
  });

  return activities;
};

export default function Chart({ weather, setActivities }) {
  const [hourlyData, setHourlyData] = useState([]);
  const activities = useMemo(() => {
    if (!weather || !weather.hourly) return [];
    return getActivitySuggestions(weather.hourly);
  }, [weather]);

  useEffect(() => {
    if (weather && weather.hourly) {
      setHourlyData(weather.hourly);
      setActivities(activities);
    }
  }, [weather, setActivities]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { date, icon, title } = payload[0].payload;
      const formattedDate = new Date(date).toLocaleString();
      return (
        <div className="bg-white border border-gray-200 p-2 rounded shadow-lg">
          <p className="text-gray-800 font-semibold">{formattedDate}</p>
          <div className="flex items-center">
            <img src={icon} alt="weather icon" className="w-8 h-8 mr-2" />
            <p className="text-gray-600">{title}</p>
          </div>
          <p className="text-gray-600">{`Temperature: ${payload[0].value}°C`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="w-full">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={hourlyData.map((hourly) => ({
              time: hourly.title,
              temperature: hourly.temp,
              date: hourly.date,
              icon: hourly.icon,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="time" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#8884d8"
              strokeWidth={3}
              dot={{ r: 6, fill: "#8884d8" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
