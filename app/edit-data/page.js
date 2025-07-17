"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

// 🧩 Components
import DateSection from "./components/DateSection";
import SubmitButton from "./components/SubmitButton";
import MultiReadingSection from "./components/MultiReadingSection";
import SingleInputSection from "./components/SingleInputSection";
import CalculationSummary from "./components/CalculationSummary";

// 🔹 Section Names
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

const createData = (names) =>
  names.map((name) => ({
    name,
    reading1: "",
    reading2: "",
    reading3: "",
  }));

export default function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(Boolean(id));

  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [pp1Data, setPp1Data] = useState(createData(pp1Names));
  const [pp2Data, setPp2Data] = useState(createData(pp2Names));
  const [otherData, setOtherData] = useState(createData(otherNames));
  const [transformerData, setTransformerData] = useState(
    createData(transformerNames)
  );
  const [pfData, setPfData] = useState(createData(pfNames));
  const [productionData, setProductionData] = useState([]);
  const [feedData, setFeedData] = useState([]);
  const [materialData, setMaterialData] = useState([]);
  const [transformer12Data, setTransformer12Data] = useState(
    createData(transformer12Names)
  );
  const [calculated, setCalculated] = useState({});
  const [isValidated, setIsValidated] = useState(false);

  const [initialSnapshot, setInitialSnapshot] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/getReadingById?id=${id}`);
        const data = res.data;

        const snapshot = {
          date: data.date || "",
          name: data.name || "",
          pp1Data: data.pp1Data || createData(pp1Names),
          pp2Data: data.pp2Data || createData(pp2Names),
          otherData: data.otherData || createData(otherNames),
          transformerData: data.transformerData || createData(transformerNames),
          pfData: data.pfData || createData(pfNames),
          productionData: data.productionData || [],
          feedData: data.feedData || [],
          materialData: data.materialData || [],
          transformer12Data: data.transformer12Data || createData(transformer12Names),
          calculated: data.calculated || {},
        };

        setDate(snapshot.date);
        setName(snapshot.name);
        setPp1Data(snapshot.pp1Data);
        setPp2Data(snapshot.pp2Data);
        setOtherData(snapshot.otherData);
        setTransformerData(snapshot.transformerData);
        setPfData(snapshot.pfData);
        setProductionData(snapshot.productionData);
        setFeedData(snapshot.feedData);
        setMaterialData(snapshot.materialData);
        setTransformer12Data(snapshot.transformer12Data);
        setCalculated(snapshot.calculated);
        setInitialSnapshot(snapshot);
      } catch (err) {
        console.error("❌ Failed to fetch reading:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    if (!isValidated) return;

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

    // 🚫 Skip submission if nothing changed
    if (id && initialSnapshot) {
      const stringify = (obj) => JSON.stringify(obj, Object.keys(obj).sort());
      if (stringify(payload) === stringify(initialSnapshot)) {
        alert("⚠️ No changes detected. Nothing to submit.");
        return;
      }
    }

    try {
      const res = id
        ? await axios.put(`/api/updateReadings?id=${id}`, payload)
        : await axios.post("/api/saveReadings", payload);

      alert(`✅ ${id ? "Updated" : "Submitted"} by ${name} on ${date}`);
      router.push("/energy-consumption");
      console.log("✅ Server response:", res.data);
    } catch (error) {
      console.error("❌ Submission failed:", error);
      alert("❌ Submission failed. Check console for details.");
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto text-center">
        <p className="text-xl font-medium">⏳ Loading data...</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="p-4">Loading form...</div>}>
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        {id ? "📝 Edit Readings" : "📥 Enter New Readings"}
      </h1>

      <DateSection
        date={date}
        setDate={setDate}
        name={name}
        setName={setName}
      />

      <MultiReadingSection title="PP1" data={pp1Data} setData={setPp1Data} />
      <MultiReadingSection title="PP2" data={pp2Data} setData={setPp2Data} />
      <MultiReadingSection
        title="Other Sections"
        data={otherData}
        setData={setOtherData}
      />
      <MultiReadingSection
        title="Transformer"
        data={transformerData}
        setData={setTransformerData}
      />
      <MultiReadingSection
        title="Power Factor"
        data={pfData}
        setData={setPfData}
      />
      <MultiReadingSection
        title="TR 1-2"
        data={transformer12Data}
        setData={setTransformer12Data}
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
        onCalculated={(result) => {
          setCalculated(result);
          setIsValidated(true);
        }}
      />

      <SubmitButton onClick={handleSubmit} />
    </div>
    </Suspense>
  );
}
