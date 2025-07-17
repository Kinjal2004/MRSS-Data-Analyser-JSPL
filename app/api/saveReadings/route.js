import { db } from "@/lib/firestore";

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("📥 Incoming JSON:\n", JSON.stringify(body, null, 2));

    // ✅ Save to Firestore
    const docRef = await db.collection("meterReadings").add({
      ...body,
      createdAt: new Date()
    });

    return Response.json({
      message: "✅ Saved to Firestore",
      docId: docRef.id,
    });
  } catch (err) {
    console.error("❌ Firestore/Parsing Error:", err);
    return Response.json({ error: "Invalid JSON or server error" }, { status: 400 });
  }
}
