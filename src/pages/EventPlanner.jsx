import { useState } from "react";
import {Chart} from "../components";

export default function EventPlanner({ weather }) {
  // const [selectedActivity, setSelectedActivity] = useState("");

  // const handleActivityChange = (event) => {
  //   setSelectedActivity(event.target.value);
  // };
  const [activities, setActivities] = useState([]);

  return (
    <>
      <h1 className="lg:text-4xl text-2xl text-center mt-4">
        Outdoor Activity Planner
      </h1>

      <div className="min-h-screen flex flex-col lg:space-x-10 justify-center lg:p-6">
        <div className=" w-full">
          <Chart weather={weather} setActivities={setActivities} />
        </div>
        {/* <DropDown handleActivityChange={handleActivityChange} selectedActivity={selectedActivity} /> */}

        <div className="p-4">
          <h2 className="text-2xl mb-4 text-center">What Can We Do in next three days?</h2>
          <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {activities.map((activity, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-md flex items-center ${activity.bgColor}`}
              >
                
                <img src={activity.icon} alt="" />
                <span className="text-gray-800">{activity.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
