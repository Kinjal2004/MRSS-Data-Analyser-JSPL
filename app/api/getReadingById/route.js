import { db } from "@/lib/firebase-admin"; // or your DB logic

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return new Response("Missing ID", { status: 400 });
  }

  const doc = await db.collection("meterReadings").doc(id).get();

  if (!doc.exists) {
    return new Response("Not found", { status: 404 });
  }
  return Response.json(doc.data());
}
