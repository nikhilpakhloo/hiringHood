import React, { useState } from "react";

export default function Tooltip({ children, text }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 p-2 bg-gray-700 text-white text-xs rounded">
          {text}
        </div>
      )}
      {children}
    </div>
  );
}
