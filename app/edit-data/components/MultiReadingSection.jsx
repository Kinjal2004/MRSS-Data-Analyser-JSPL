"use client";
import React, { useState } from "react";

const MultiReadingSection = ({ sectionName, data, setData, multiplierConfig = {} }) => {
  const [resetValues, setResetValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;

    const final = parseFloat(updated[index].final);
    const initial = parseFloat(updated[index].initial);
    const name = updated[index].name;

    const hasBothValues = !isNaN(final) && !isNaN(initial);

    if (hasBothValues) {
      if (final >= initial) {
        const rawTotal = (final - initial) * 1000;
        updated[index].total = multiplierConfig[name]
          ? rawTotal * multiplierConfig[name]
          : rawTotal;

        setResetValues((prev) => ({ ...prev, [index]: undefined }));
        setErrors((prev) => ({ ...prev, [index]: undefined }));
      } else {
        updated[index].total = "";
        setResetValues((prev) => ({ ...prev, [index]: "" }));
        setErrors((prev) => ({ ...prev, [index]: undefined }));
      }
    }

    setData(updated);
  };

  const handleResetConfirm = (index) => {
    const updated = [...data];
    const reset = parseFloat(resetValues[index]);
    const final = parseFloat(updated[index].final);
    const initial = parseFloat(updated[index].initial);
    const name = updated[index].name;

    if (isNaN(reset)) {
      setErrors((prev) => ({ ...prev, [index]: "Enter a valid reset value." }));
      return;
    }

    if (reset <= initial) {
      setErrors((prev) => ({
        ...prev,
        [index]: "Reset value must be greater than the initial reading.",
      }));
      return;
    }

    const correctedInitial = initial - reset;
    const rawTotal = (final - correctedInitial)*1000;
    updated[index].total = multiplierConfig[name]
      ? rawTotal * multiplierConfig[name]
      : rawTotal;

    setResetValues((prev) => ({ ...prev, [index]: undefined }));
    setErrors((prev) => ({ ...prev, [index]: undefined }));
    setData(updated);
  };

  return (
    <div className="border p-4 rounded shadow bg-white">
      <h2 className="text-lg font-semibold mb-3">{sectionName}</h2>
      <div className="grid grid-cols-4 gap-4 font-semibold">
        <span></span>
        <span>Final(MWH)</span>
        <span>Initial(MWH)</span>
        <span>Total(kWh)</span>
      </div>
      {data.map((item, index) => {
        const final = parseFloat(item.final);
        const initial = parseFloat(item.initial);
        const needsReset = !isNaN(final) && !isNaN(initial) && final < initial;

        return (
          <div key={item.name} className="my-2">
            <div className="grid grid-cols-4 gap-4 items-center">
              <span>{item.name}</span>
              <input
                type="number"
                value={item.final}
                onChange={(e) => handleChange(index, "final", e.target.value)}
                className="border px-2 py-1"
              />
              <input
                type="number"
                value={item.initial}
                onChange={(e) => handleChange(index, "initial", e.target.value)}
                className="border px-2 py-1"
              />
              <input
                type="text"
                value={item.total || ""}
                readOnly
                className="bg-gray-100 border px-2 py-1"
              />
            </div>

            {needsReset && resetValues[index] !== undefined && (
              <div className="col-span-4 flex gap-2 items-center ml-4 mt-1">
                <span className="text-sm text-red-600">Reset value:</span>
                <input
                  type="number"
                  value={resetValues[index] || ""}
                  onChange={(e) =>
                    setResetValues((prev) => ({ ...prev, [index]: e.target.value }))
                  }
                  className="border px-2 py-1 text-sm w-28"
                  placeholder="Enter reset"
                />
                <button
                  onClick={() => handleResetConfirm(index)}
                  className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
                >
                  OK
                </button>
              </div>
            )}

            {errors[index] && (
              <p className="text-red-600 text-sm ml-4 mt-1">{errors[index]}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MultiReadingSection;
