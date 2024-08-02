import { useState } from "react";
import Chart from "../components/eventcomponents/Chart";

export default function EventPlanner({ weather }) {
  const [activities, setActivities] = useState([]);

  return (
    <>
      <h1 className="lg:text-4xl text-2xl text-center mt-4">Outdoor Activity Planner</h1>
      <div className="min-h-screen lg:flex lg:space-x-10 justify-center lg:p-6">
        <div className=" w-full">
          <Chart weather={weather} setActivities={setActivities} />
        </div>
        <div className="lg:w-1/2 w-full">
          <h2 className="text-xl mb-4">What Can We Do Today?</h2>
          <ul className="space-y-4">
            {activities.map((activity, index) => (
              <li key={index} className={`p-4 rounded-lg shadow-md flex items-center ${activity.bgColor}`}>
                <span className="text-2xl mr-4">{activity.icon}</span>
                <span className="text-gray-800">{activity.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
