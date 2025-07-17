import { db } from "@/lib/firebase-admin";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("start"); // optional
    const endDate = searchParams.get("end");     // optional

    let query = db.collection("meterReadings");

    // Apply range filters if dates provided
    if (startDate) {
      query = query.where("date", ">=", startDate);
    }

    if (endDate) {
      query = query.where("date", "<=", endDate);
    }

    // Important: You must order by the field you're filtering on
    query = query.orderBy("date", "desc").limit(30);

    const snapshot = await query.get();

    const results = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return Response.json({ count: results.length, data: results });
  } catch (err) {
    console.error("❌ Error fetching readings:", err);
    return new Response("Server error", { status: 500 });
  }
}
