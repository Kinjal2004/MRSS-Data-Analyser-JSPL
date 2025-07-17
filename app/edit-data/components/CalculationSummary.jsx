"use client";
import React from "react";
import { useEffect } from "react";

const CalculationSummary = ({ allData, onCalculated }) => {
  if (!allData) return null;

  const {
    pp1Data,
    pp2Data,
    otherData,
    transformerData,
    pfData,
    productionData,
    feedData,
    materialData,
    transformer12Data,
  } = allData;

  // ===== 🔹 TOTAL USAGE CALCULATIONS =====
  const pgpUsage = parseFloat(
    otherData.find((item) => item.name === "PGP")?.total || 0
  );
  const iolcUsage = otherData
    .filter((item) => item.name !== "PGP")
    .reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);

  const pp1Total = pp1Data.reduce(
    (sum, item) => sum + (parseFloat(item.total) || 0),
    0
  );
  const pp2Total = pp2Data.reduce(
    (sum, item) => sum + (parseFloat(item.total) || 0),
    0
  );
  const tranfoBillTotal = transformer12Data.reduce(
    (sum, item) => sum + (parseFloat(item.total) || 0),
    0
  );

  // ===== 🔹 FEED CALCULATIONS =====
  const totalFeed = feedData.reduce(
    (sum, item) => sum + (parseFloat(item.value) || 0),
    0
  );

  const eer1Usage = pp1Data
    .filter(
      (item) => item.name === "EER#1 I/C-1" || item.name === "EER#1 I/C-2"
    )
    .reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);

  const MF = totalFeed !== 0 ? eer1Usage / totalFeed : 0;

  const materialValue = parseFloat(
    materialData.find((m) => m.name === "Material from PP-1")?.value || 0
  );

  const transformerUsage = transformerData.reduce(
    (sum, item) => sum + (parseFloat(item.total) || 0),
    0
  );

  // ===== 🔹 NESCO METER READING CALCULATIONS =====
  const cwh = parseFloat(pfData.find((i) => i.name === "CWH")?.total || 0);
  const cvah = parseFloat(pfData.find((i) => i.name === "CVAH")?.total || 0);
  const pf = cvah !== 0 ? cwh / cvah : 0;
  const nescoTotalReading = cwh * 1.2;

  // ===== 🔹 USAGE AND PRODUCTION =====
  const pp1Usage = pp1Total + MF * materialValue;
  const pp2Usage = pp2Total;
  const plantUsage = pp1Usage + pp2Usage;

  const pp1Production = parseFloat(
    productionData.find((p) => p.name === "PP-1 PRODUCTION")?.value || 0
  );
  const pp2Production = parseFloat(
    productionData.find((p) => p.name === "PP-2 PRODUCTION")?.value || 0
  );
  const totalProduction = pp1Production + pp2Production;

  const specificPP1 = pp1Production !== 0 ? pp1Usage / pp1Production : 0;
  const specificPP2 = pp2Production !== 0 ? pp2Usage / pp2Production : 0;
  const specificPlant =
    totalProduction !== 0 ? plantUsage / totalProduction : 0;

  const totalUsage = +(
    parseFloat(iolcUsage) +
    parseFloat(pgpUsage) +
    pp1Usage +
    pp2Usage
  ).toFixed(2);

  const calculatedData = {
    usage: {
      iolcUsage: +iolcUsage.toFixed(2),
      pgpUsage: +pgpUsage.toFixed(2),
      pp1Usage: +pp1Usage.toFixed(2),
      pp2Usage: +pp2Usage.toFixed(2),
      plantUsage: +plantUsage.toFixed(2),
      totalUsage: +totalUsage,
      transformerUsage: +transformerUsage.toFixed(2),
      transformer12Usage: +tranfoBillTotal.toFixed(2),
    },
    nesco: {
      cwh: +cwh.toFixed(2),
      cvah: +cvah.toFixed(2),
      pf: +pf.toFixed(3),
      nescoTotalReading: +nescoTotalReading.toFixed(2),
    },
    feed: {
      totalFeed: +totalFeed.toFixed(2),
      eer1Usage: +eer1Usage.toFixed(2),
      mf: +MF.toFixed(3),
      materialTransfer: +materialValue.toFixed(2),
    },
    production: {
      pp1Production: +pp1Production.toFixed(2),
      pp2Production: +pp2Production.toFixed(2),
      totalProduction: +totalProduction.toFixed(2),
    },
    specificConsumption: {
      specificPP1: +specificPP1.toFixed(3),
      specificPP2: +specificPP2.toFixed(3),
      specificPlant: +specificPlant.toFixed(3),
    },
  };

  useEffect(() => {
    if (typeof onCalculated === "function") {
      onCalculated(calculatedData);
    }
  }, [
    pgpUsage, iolcUsage, pp1Usage, pp2Usage, plantUsage,
    totalUsage, totalFeed, MF, materialValue,
    cwh, cvah, pf, nescoTotalReading,
    pp1Production, pp2Production, totalProduction,
    specificPP1, specificPP2, specificPlant,
    transformerUsage, tranfoBillTotal
  ]);
  // ===== ✅ UI RENDERING =====
  return (
    <div className="border p-4 bg-white rounded shadow mt-4 space-y-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Calculation Summary
      </h2>

      {/* 🔹 Total Usage Section */}
      <div className="bg-gray-50 p-4 rounded border">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          🔹 Total Usage
        </h3>
        <p>
          <strong>IOLC Usage:</strong> {iolcUsage.toFixed(2)} MWh
        </p>
        <p>
          <strong>PGP Usage:</strong> {pgpUsage.toFixed(2)} MWh
        </p>
        <p>
          <strong>PP-1 Usage:</strong> {pp1Usage.toFixed(2)} MWh
        </p>
        <p>
          <strong>PP-2 Usage:</strong> {pp2Usage.toFixed(2)} MWh
        </p>
        <p className="mt-2">
          <strong>Plant Usage:</strong> {plantUsage.toFixed(2)} MWh
        </p>
        <p className="mt-2">
          <strong>Total Usage:</strong> {totalUsage} MWh
        </p>
        <p>
          <strong>Transformer Usage:</strong> {transformerUsage.toFixed(2)} MWh
        </p>
        <p>
          <strong>12-12 Usage:</strong> {tranfoBillTotal.toFixed(2)} MWh
        </p>
      </div>

      {/* 🔹 Nesco Meter Readings */}
      <div className="bg-gray-50 p-4 rounded border">
        <h3 className="text-lg font-semibold text-red-700 mb-2">
          🔹 Nesco Meter Readings
        </h3>
        <p>
          <strong>CWH:</strong> {cwh.toFixed(2)} kWh
        </p>
        <p>
          <strong>CVAH:</strong> {cvah.toFixed(2)} kVAh
        </p>
        <p>
          <strong>PF (Power Factor):</strong> {pf.toFixed(3)}
        </p>
        <p>
          <strong>Nesco Total Reading:</strong> {nescoTotalReading.toFixed(2)}{" "}
          kWh
        </p>
      </div>

      {/* 🔹 Feed Calculations Section */}
      <div className="bg-gray-50 p-4 rounded border">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          🔹 Feed Calculations
        </h3>
        <p>
          <strong>Total Feed:</strong> {totalFeed.toFixed(2)} Tons
        </p>
        <p>
          <strong>EER#1 Usage:</strong> {eer1Usage.toFixed(2)} MWh
        </p>
        <p>
          <strong>Material Transfer from PP-1:</strong>{" "}
          {materialValue.toFixed(2)} Tons
        </p>
        <p>
          <strong>MF (Multiplication Factor):</strong> {MF.toFixed(3)}
        </p>
      </div>

      {/* 🔹 Specific Consumption Section */}
      <div className="bg-gray-50 p-4 rounded border">
        <h3 className="text-lg font-semibold text-purple-800 mb-2">
          🔹 Specific Consumption
        </h3>
        <p>
          <strong>PP-1:</strong> {pp1Usage.toFixed(2)} kWh /{" "}
          {pp1Production.toFixed(2)} Tons →{" "}
          <strong>{specificPP1.toFixed(3)}</strong> kWh/Ton
        </p>
        <p>
          <strong>PP-2:</strong> {pp2Usage.toFixed(2)} kWh /{" "}
          {pp2Production.toFixed(2)} Tons →{" "}
          <strong>{specificPP2.toFixed(3)}</strong> kWh/Ton
        </p>
        <p>
          <strong>Total Plant:</strong> {plantUsage.toFixed(2)} kWh /{" "}
          {totalProduction.toFixed(2)} Tons →{" "}
          <strong>{specificPlant.toFixed(3)}</strong> kWh/Ton
        </p>
      </div>
    </div>
  );
};

export default CalculationSummary;
