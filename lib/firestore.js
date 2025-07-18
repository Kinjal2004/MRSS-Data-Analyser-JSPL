import { Firestore } from "@google-cloud/firestore";

// Convert escaped newlines in the private key
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

// Create the Firestore client
const db = new Firestore({
  projectId: process.env.FIREBASE_PROJECT_ID,
  credentials: {
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: privateKey,
  },
});

export { db };
