import React from "react";
import { Tooltip } from "react-tooltip";

export default function Button({ icon, tooltipText, onClick }) {
  return (
    <div>
      <button
        className="w-8 h-8 flex justify-center p-1 items-center hover:bg-gray-100 bg-white text-black rounded-md cursor-pointer shadow-lg"
        onClick={onClick}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={tooltipText}
      >
        {icon}
      </button>
      <Tooltip id="my-tooltip" style={{ borderRadius: "20px" }} />
    </div>
  );
}
