"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setError(data.message);
      return;
    }

  if (!res.ok) {
  setError(data.message);
  return;
}

window.location.href = "/admin/dashboard";
  }

  return (
    <div className="min-h-screen bg-[#071B44] flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="bg-white w-[420px] rounded-3xl p-10 shadow-2xl"
      >

        <h1 className="text-4xl font-bold text-center text-[#071B44]">
          Admin Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border rounded-xl p-4 mt-10"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-xl p-4 mt-5"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-600 mt-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white py-4 rounded-xl mt-8 text-lg font-semibold"
        >
          {loading ? "Loading..." : "Login"}
        </button>

      </form>

    </div>
  );
}