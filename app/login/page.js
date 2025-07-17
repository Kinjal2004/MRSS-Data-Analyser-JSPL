"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/login", { id, password });
      
      if (res.status === 200) {
        router.push("/energy-consumption");
      }
    } catch (err) {
      setError("❌ Invalid ID or Password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold mb-6">Login Page</h1>

      <input
        type="text"
        placeholder="Enter ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="mb-4 border p-2 rounded w-full max-w-md"
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 border p-2 rounded w-full max-w-md"
      />

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  );
}
