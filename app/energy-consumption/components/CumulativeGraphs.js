"use client";
import React, { useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define chart configs
const chartConfigs = [
  {
    key: "powerFactor",
    label: "Power Factor from NESCO Meter",
    showYAxisLabel: false,
    yAxisLabel: "",
    format: (val) => val.toFixed(2),
  },
  {
    key: "totalEnergyMWH",
    label: "Total Energy Consumption of Plant (in MWh)",
    showYAxisLabel: true,
    yAxisLabel: "MWh",
    format: (val) => val.toFixed(2),
  },
];

const CumulativeGraphs = ({ data }) => {
  const chartRefs = useRef([]);

  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center border border-dashed border-gray-400 rounded-md text-gray-500">
        No data to display
      </div>
    );
  }
  //Sorting Data in Ascending order of date
  data.sort((a,b)=>(a.date>b.date)?1:-1)
  // Flatten for plotting
  const flattenedData = data.map((item) => ({
    date: item.date
      ? new Date(item.date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        })
      : "Unknown",
    powerFactor: item.calculated?.nesco?.pf ?? 0,
    totalEnergyMWH: (item.calculated?.usage?.totalUsage ?? 0) / 1000,
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Cumulative Energy Consumption Graphs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {chartConfigs.map(({ key, label, showYAxisLabel, yAxisLabel, format }, idx) => (
          <div
            key={key}
            ref={(el) => (chartRefs.current[idx] = el)}
            className="bg-white p-4 rounded-2xl shadow border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-center mb-3">{label}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={flattenedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  type="number"
                  domain={["auto", "auto"]}
                  tickFormatter={format}
                  label={
                    showYAxisLabel
                      ? {
                          value: yAxisLabel,
                          angle: -90,
                          position: "insideLeft",
                          style: { textAnchor: "middle", fontSize: 14 },
                        }
                      : undefined
                  }
                />
                <Tooltip formatter={(value) => format(value)} />
                <Line
                  type="monotone"
                  dataKey={key}
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CumulativeGraphs;
