"use client";
import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";

// Components
import DateSection from "./components/DateSection";
import SubmitButton from "./components/SubmitButton";
import MultiReadingSection from "./components/MultiReadingSection";
import SingleInputSection from "./components/SingleInputSection";
import CalculationSummary from "./components/CalculationSummary";

// Constants
const SECRET_KEY = process.env.NEXT_PUBLIC_LOCAL_STORAGE_KEY || "fallback_key";
const LOCAL_STORAGE_KEY = "fullEncryptedReadingForm";

// Labels for readings
const pp1Names = ["EER#3 I/C-1", "EER#3 I/C-2", "EER#1 I/C-1", "EER#1 I/C-2"];
const pp2Names = [
  "EER#13 I/C-1",
  "EER#13 I/C-2",
  "EER#11 I/C-1",
  "EER#11 I/C-2",
];
const otherNames = ["HT/LT-1", "HT/LT-2", "STATION", "PGP"];
const transformerNames = ["TRAFO-1", "TRAFO-2", "TRAFO-3"];
const pfNames = ["CWH", "CVAH"];
const transformer12Names = [
  "TRAFO-1(12-12)",
  "TRAFO-2(12-12)",
  "TRAFO-3(12-12)",
];

// Helper to create initial reading data
const createData = (names) =>
  names.map((name) => ({ name, initial: "", final: "", total: "" }));

// Utility: Encrypt & Save
const saveEncryptedData = (data) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      SECRET_KEY
    ).toString();
    localStorage.setItem(LOCAL_STORAGE_KEY, encrypted);
  } catch (err) {
    console.error("🔐 Save failed:", err);
  }
};

// Utility: Load & Decrypt
const loadEncryptedData = () => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!saved) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(saved, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (err) {
    console.error("🔐 Load failed:", err);
    return null;
  }
};

const Page = () => {
  // Basic Info
  const [date, setDate] = useState("");
  const [name, setName] = useState("");

  // Multi-reading sections
  const [pp1Data, setPp1Data] = useState(createData(pp1Names));
  const [pp2Data, setPp2Data] = useState(createData(pp2Names));
  const [otherData, setOtherData] = useState(createData(otherNames));
  const [transformerData, setTransformerData] = useState(
    createData(transformerNames)
  );
  const [transformer12Data, setTransformer12Data] = useState(
    createData(transformer12Names)
  );
  const [pfData, setPfData] = useState(createData(pfNames));

  // Single-entry sections
  const [productionData, setProductionData] = useState([
    { name: "PP-1 PRODUCTION", value: "" },
    { name: "PP-2 PRODUCTION", value: "" },
  ]);
  const [feedData, setFeedData] = useState([
    { name: "DF-1 FEED", value: "" },
    { name: "DF-2 FEED", value: "" },
  ]);
  const [materialData, setMaterialData] = useState([
    { name: "Material from PP-1", value: "" },
  ]);

  // Validation & summary state
  const [isValidated, setIsValidated] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [calculated, setCalculated] = useState({});

  // Restore from storage
  useEffect(() => {
    const data = loadEncryptedData();
    if (!data) return;
    setDate(data.date || "");
    setName(data.name || "");
    setPp1Data(data.pp1Data || createData(pp1Names));
    setPp2Data(data.pp2Data || createData(pp2Names));
    setOtherData(data.otherData || createData(otherNames));
    setTransformerData(data.transformerData || createData(transformerNames));
    setPfData(data.pfData || createData(pfNames));
    setProductionData(data.productionData || productionData);
    setFeedData(data.feedData || feedData);
    setMaterialData(data.materialData || materialData);
    setTransformer12Data(
      data.transformer12Data || createData(transformer12Names)
    );
  }, []);

  // Save to storage
  useEffect(() => {
    const payload = {
      date,
      name,
      pp1Data,
      pp2Data,
      otherData,
      transformerData,
      pfData,
      productionData,
      feedData,
      materialData,
      transformer12Data,
    };
    saveEncryptedData(payload);
  }, [
    date,
    name,
    pp1Data,
    pp2Data,
    otherData,
    transformerData,
    pfData,
    productionData,
    feedData,
    materialData,
    transformer12Data,
  ]);

  // Validation & calculation handler
  const validateAndCalculate = () => {
    if (!date.trim() || !name.trim()) {
      alert("⚠️ Please enter both name and date.");
      return;
    }

    const sections = [pp1Data, pp2Data, otherData, transformerData, pfData];
    const allFilled = sections.every((sec) =>
      sec.every((item) => item.initial && item.final && item.total !== "")
    );
    const singlesFilled = [
      ...productionData,
      ...feedData,
      ...materialData,
    ].every((item) => item.value !== "");

    if (!allFilled || !singlesFilled) {
      alert("⚠️ Please fill all fields correctly before calculating.");
      return;
    }

    setIsValidated(true);
    setShowSummary(true);
  };

  const handleSubmit = async () => {
    if (!isValidated) return;
    if (!date.trim() || !name.trim()) {
      alert("⚠️ Please enter both name and date.");
      return;
    }

    const payload = {
      date,
      name,
      pp1Data,
      pp2Data,
      otherData,
      transformerData,
      pfData,
      productionData,
      feedData,
      materialData,
      transformer12Data,
      calculated,
    };

    try {
      const res = await axios.post("/api/saveReadings", payload);
      alert(`✅ Submitted by ${name} on ${date}`);
      console.log("✅ Server response:", res.data);
    } catch (error) {
      console.error("❌ Submission failed:", error);
      alert("❌ Submission failed. Check console for details.");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-10">
      <DateSection
        date={date}
        setDate={setDate}
        name={name}
        setName={setName}
      />

      <MultiReadingSection
        sectionName="PP-1"
        data={pp1Data}
        setData={setPp1Data}
      />
      <MultiReadingSection
        sectionName="PP-2"
        data={pp2Data}
        setData={setPp2Data}
      />
      <MultiReadingSection
        sectionName="Others (HT/LT, STATION, PGP)"
        data={otherData}
        setData={setOtherData}
        multiplierConfig={{ "HT/LT-2": 2 }}
      />
      <MultiReadingSection
        sectionName="Transformer Section"
        data={transformerData}
        setData={setTransformerData}
      />
      <MultiReadingSection
        sectionName="12-12 Section"
        data={transformer12Data}
        setData={setTransformer12Data}
      />

      <MultiReadingSection
        sectionName="Nesco Meter Readings"
        data={pfData}
        setData={setPfData}
      />

      <SingleInputSection
        sectionTitle="Production Data"
        entries={productionData}
        setEntries={setProductionData}
      />
      <SingleInputSection
        sectionTitle="Feed Data"
        entries={feedData}
        setEntries={setFeedData}
      />
      <SingleInputSection
        sectionTitle="Material Transfer"
        entries={materialData}
        setEntries={setMaterialData}
      />

      {showSummary && (
        <CalculationSummary
          allData={{
            pp1Data,
            pp2Data,
            otherData,
            transformerData,
            pfData,
            productionData,
            feedData,
            materialData,
            transformer12Data,
          }}
          onCalculated={(data) => setCalculated(data)}
        />
      )}
      <div className="flex gap-4">
        <button
          onClick={validateAndCalculate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ✅ Validate & Calculate
        </button>
        <SubmitButton onClick={handleSubmit} disabled={!isValidated} />
      </div>
    </div>
  );
};

export default Page;
