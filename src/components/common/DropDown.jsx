import React from "react";

export default function DropDown({ selectedActivity, handleActivityChange }) {
  return (
    <div className="my-4">
      <label htmlFor="activity" className="block text-lg mb-2">
        Select Activity:
      </label>
      <select
        id="activity"
        value={selectedActivity}
        onChange={handleActivityChange}
        className="border border-gray-300 rounded-lg p-2 w-full"
      >
        <option value="" disabled>
          Select an activity
        </option>

        <option value="hiking">Hiking</option>
        <option value="biking">Biking</option>
        <option value="running">Running</option>
        <option value="picnic">Picnic</option>
        <option value="photography">Photography</option>
        <option value="reading">Reading</option>
      </select>
    </div>
  );
}
