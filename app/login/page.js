"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/login", { id, password });
      if (res.status === 200) {
        router.push("/energy-consumption");
      }
    } catch (err) {
      setError("❌ Invalid ID or Password");
    } finally {
      setLoading(false);
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

      <div className="relative w-full max-w-md mb-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full pr-20"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-2 text-sm text-blue-600 hover:underline"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? <span className="loading loading-spinner loading-xl color-green"></span> : "Login"}
      </button>
    </div>
  );
}
