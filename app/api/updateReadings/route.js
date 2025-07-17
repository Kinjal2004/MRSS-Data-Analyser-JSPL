import { db } from "@/lib/firestore"; // or your DB logic

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Missing ID", { status: 400 });
  }

  try {
    const data = await req.json();
    await db.collection("meterReadings").doc(id).update(data);
    return Response.json({ message: "✅ Reading updated" });
  } catch (err) {
    console.error("❌ Update failed:", err);
    return new Response("Server error", { status: 500 });
  }
}
