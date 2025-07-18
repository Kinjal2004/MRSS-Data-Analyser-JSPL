"use client";
import React from "react";

const SingleInputSection = ({ sectionTitle, entries, setEntries }) => {
  const handleChange = (index, value) => {
    const updated = [...entries];
    updated[index].value = value;
    setEntries(updated);
  };

  const total = entries.reduce((sum, item) => {
    const val = parseFloat(item.value);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  return (
    <div className="border p-4 rounded shadow bg-white">
      <h2 className="text-lg font-semibold mb-3">{sectionTitle}</h2>
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        {entries.map((item, index) => (
          <div key={item.name} className="flex gap-4 items-center">
            <label className="w-40">{item.name}</label>
            <input
              type="number"
              value={item.value}
              onChange={(e) => handleChange(index, e.target.value)}
              className="border px-2 py-1 w-40"
              placeholder="Enter value"
            />
          </div>
        ))}
      </div>
      {entries.length > 1 && (
        <div className="mt-4 font-semibold text-right">
          Total: <span className="text-blue-600">{total}</span>
        </div>
      )}
    </div>
  );
};

export default SingleInputSection;
