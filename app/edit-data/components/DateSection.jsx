import React from "react";

const DateSection = ({ date, setDate, name, setName }) => (
  <section>
    <h2 className="text-xl font-bold mb-4 border-b pb-1">Edit Details</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Date Picker */}
      <div className="space-y-1">
        <label className="font-semibold">Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input input-bordered w-full rounded-xl bg-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        />
      </div>

      {/* Name Input */}
      <div className="space-y-1">
        <label className="font-semibold">Your Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
          className="input input-bordered w-full rounded-xl bg-gray-200 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        />
      </div>
    </div>
  </section>
);

export default DateSection;
