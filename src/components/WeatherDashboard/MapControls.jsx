import React from "react";
import Button from "./Button";
import { TiWeatherShower, TiWeatherWindy } from "react-icons/ti";
import { GiPressureCooker } from "react-icons/gi";
import { CiTempHigh } from "react-icons/ci";

export default function MapControls({ setLayer }) {
  const handleClick = (type) => {
    setLayer(type);
  };

  return (
    <>
      <Button
        icon={<TiWeatherShower size={18} />}
        onClick={() => handleClick("precipitation_new")}
        tooltipText="Precipitation"
      />
      <Button
        icon={<GiPressureCooker size={18} />}
        onClick={() => handleClick("clouds_new")}
        tooltipText="Clouds"
      />
      <Button
        icon={<TiWeatherWindy size={18} />}
        onClick={() => handleClick("wind_new")}
        tooltipText="Wind"
      />
      <Button
        icon={<CiTempHigh size={18} />}
        onClick={() => handleClick("temp_new")}
        tooltipText="Temperature"
      />
    </>
  );
}
