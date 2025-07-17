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
  { key: "specificPP1", label: "Specific Consumption - PP1" },
  { key: "specificPP2", label: "Specific Consumption - PP2" },
  { key: "specificPlant", label: "Specific Consumption - Plant" },
  { key: "specificOverall", label: "Specific Consumption - Overall" },
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

  // Flatten for plotting
  const flattenedData = data.map((item) => {
    const totalUsage = item.calculated?.usage?.totalUsage ?? 0;
    const totalProduction = item.calculated?.production?.totalProduction ?? 1;

    return {
      date: item.date
        ? new Date(item.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          })
        : "Unknown",
      specificPP1: item.calculated?.specificConsumption?.specificPP1 ?? 0,
      specificPP2: item.calculated?.specificConsumption?.specificPP2 ?? 0,
      specificPlant: item.calculated?.specificConsumption?.specificPlant ?? 0,
      specificOverall:
        totalProduction !== 0 ? totalUsage / totalProduction : 0,
    };
  });

  return (
    <div className="space-y-6">
      {/* Main heading */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Cumulative Specific Consumption Graphs
      </h2>

      {/* Graphs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {chartConfigs.map(({ key, label }, idx) => (
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
                  type="number" // linear by default
                  domain={['auto', 'auto']}
                  label={{
                    value: "kWh/ton",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle", fontSize: 14 },
                  }}
                />
                <Tooltip />
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
