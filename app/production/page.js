"use client";

import React, { useState, useEffect } from "react";
import DateFilterBar from "./components/DateFilterBar";
import SummaryTable from "./components/SummaryTable";
import CumulativeGraphs from "./components/CumulativeGraphs";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Function to fetch data
  const fetchData = async (startDate, endDate) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/getReadings?start=${startDate}&end=${endDate}`
      );
      const json = await res.json();
      setData(json.data || []);
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Called when date is selected
  const handleDateChange = (start, end) => {
    fetchData(start, end);
  };

  // ✅ Default load on mount (e.g., All time)
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    fetchData("2000-01-01", today);
  }, []);

  return (
    <div className="p-4 space-y-6">
      <DateFilterBar onDateChange={handleDateChange} />
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <span className="loading loading-spinner loading-xl color-green"></span>
        </div>
      ) : (
        <>
          <SummaryTable data={data} />
          <CumulativeGraphs data={data} />
        </>
      )}
    </div>
  );
};

export default Page;
