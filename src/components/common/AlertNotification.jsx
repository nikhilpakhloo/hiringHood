const AlertNotification = ({ alerts }) => {
    let alertContent;
  
    switch (alerts?.details) {
      case "Clouds":
        alertContent = (
          <div className="p-4 bg-gray-100 text-gray-800 rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold mb-2">Cloudy Skies Ahead!</h4>
            <p className="text-gray-700 font-medium text-sm mb-1">Cloud Cover: {alerts.name}</p>
            <p className="text-gray-600 text-sm">Temperature: {alerts.temp}</p>
          </div>
        );
        break;
  
   
  
      case "Snow":
        alertContent = (
          <div className="p-4 bg-white rounded-lg shadow-lg text-gray-800">
            <h4 className="text-lg font-semibold mb-2">Snow Alert!</h4>
            <p className="text-gray-700 font-medium text-sm mb-1">Snowfall: {alerts.name}</p>
            <p className="text-gray-600 text-sm">Temperature: {alerts.temp}</p>
          </div>
        );
        break;
  
    
  
      default:
        alertContent = (
          <div className="p-4 text-center text-gray-500">
            No alerts at the moment.
          </div>
        );
        break;
    }
  
    return (
      <div className="fixed bottom-4 right-4 w-80 max-w-xs bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {alerts ? alertContent : <div className="p-4 text-center text-gray-500">No alerts at the moment.</div>}
      </div>
    );
  };
  
  export default AlertNotification;
  