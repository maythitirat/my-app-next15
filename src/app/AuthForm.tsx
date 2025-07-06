import { useState, useEffect } from "react";

export default function AuthForm({ onAuth }: { onAuth: () => void }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("pending_auth_name", name);
  }, [name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().toLowerCase() === "thitirat") {
      setError("");
      onAuth();
    } else {
      setError("Incorrect name");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl shadow max-w-xs mx-auto mt-20">
      <h2 className="text-xl font-bold mb-2">Sign in</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />
      {error && <div className="text-gray-600 text-sm">{error}</div>}
      <button type="submit" className="bg-gray-900 text-white font-semibold px-4 py-2 rounded w-full hover:bg-gray-700 transition-colors">Sign in</button>
    </form>
  );
}
