import React from "react";

export default function TodayForecast({ weather }) {
  
  return (
    <div className=" mt-4 w-full max-w-4xl md:p-6 p-2 bg-white shadow-lg rounded-2xl">
      <div className="space-y-3">
        <h1 className="lg:text-2xl text-xl text-center">Today's Forecast</h1>
        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2">
          {weather?.hourly?.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col justify-center items-center  space-y-4 ${
                index < weather?.hourly.length - 1 && "lg:border-r-2      "
              }  w-40 p-5`}
            >
              <p>{item.title}</p>

              <img src={item.icon} alt="icon" />

              <p>{Math.floor(item.temp) }</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
