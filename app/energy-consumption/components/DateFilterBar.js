"use client";
import React, { useState } from "react";

const DateFilterBar = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [selectedPreset, setSelectedPreset] = useState(null); // <-- NEW STATE

  const handleClick = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }
    onDateChange?.(startDate, endDate);
  };

  const setDateRange = (daysAgo, label) => {
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - daysAgo);
    setStartDate(past.toISOString().slice(0, 10));
    setEndDate(today.toISOString().slice(0, 10));
    setSelectedPreset(label); // <-- set selected
  };

  const handleAllClick = () => {
    setStartDate("2000-01-01");
    setEndDate(new Date().toISOString().slice(0, 10));
    setSelectedPreset("All");
  };

  const presets = [
    { label: "1D", days: 1 },
    { label: "1W", days: 7 },
    { label: "1M", days: 30 },
    { label: "6M", days: 180 },
    { label: "1Y", days: 365 },
    { label: "5Y", days: 1825 },
  ];

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <h2 className="text-xl font-bold whitespace-nowrap">Filter by Date Range</h2>

      {/* Presets */}
      <div className="flex gap-2 flex-wrap">
        {presets.map(({ label, days }) => (
          <button
            key={label}
            className={`btn btn-sm border-orange-500 hover:bg-orange-100 ${
              selectedPreset === label
                ? "bg-orange-500 text-white"
                : "btn-outline text-orange-600"
            }`}
            onClick={() => setDateRange(days, label)}
          >
            {label}
          </button>
        ))}

        <button
          className={`btn btn-sm border-orange-500 hover:bg-orange-100 ${
            selectedPreset === "All"
              ? "bg-orange-500 text-white"
              : "btn-outline text-orange-600"
          }`}
          onClick={handleAllClick}
        >
          All
        </button>
      </div>

      {/* Date Inputs */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Start</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            setSelectedPreset(null); // deselect preset if manual change
          }}
          className="input input-sm input-bordered w-36"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">End</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            setSelectedPreset(null); // deselect preset if manual change
          }}
          className="input input-sm input-bordered w-36"
        />
      </div>

      {/* Fetch Button */}
      <button
        onClick={handleClick}
        className="btn btn-sm bg-orange-500 text-white hover:bg-orange-600"
      >
        Fetch
      </button>
    </div>
  );
};

export default DateFilterBar;
