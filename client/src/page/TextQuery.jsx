import React, { useState } from "react";

const TextQuery = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("http://localhost:5000/api/v1/stability-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setResponse("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <section className="max-w-2xl mx-auto mt-10">
      <h1 className="font-bold text-2xl mb-4">Text Query (Stability AI)</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : "Ask"}
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <strong>Response:</strong>
          <div>{response}</div>
        </div>
      )}
    </section>
  );
};

export default TextQuery;