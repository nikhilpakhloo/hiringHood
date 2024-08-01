import React from "react";

const UpcomingForecast = ({ weather, unit }) => {

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    const options = { weekday: 'long' }; 
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
 

  return (
    <div className="mt-4 p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl text-center mb-4">Daily Forecast</h1>

      <div>
        
        {weather?.daily?.length > 0 ? (
          weather.daily.map((data, index) => (
            <div key={index} className={`mt-4 p-4 ${index < weather.daily.length - 1 ? "border-b-2" : ""}`}>
              <div className="flex space-x-5 items-center justify-between">
                <p className="text-lg">{getDayName(data.date)}</p>
                <div className="flex space-x-2 items-center">
                  <img
                    src={data.icon }
                    alt="weather icon"
                    style={{ width: '30px' }}
                  />
                  <p className="text-sm">{data.details || 'N/A'}</p>
                </div>
                <p className="text-lg">{`${Math.floor(data.temp)} ${unit === "metric"? "°C":"°K"}`}</p> 
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No daily forecast data available.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingForecast;
