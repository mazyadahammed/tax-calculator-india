"use client";

import React, { useState } from "react";

export default function AudienceCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    const endpoint = process.env.NEXT_PUBLIC_AUDIENCE_FORM_ENDPOINT;
    if (!endpoint) {
      // Mock integration if no environment variable is provided
      setTimeout(() => {
        setStatus("success");
        setEmail("");
      }, 1000);
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, signupSource: "ThinkFinance Tax Tool" }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Audience Capture Error:", err);
      setStatus("error");
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-xl p-6 text-center space-y-4 max-w-md mx-auto my-8">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Never Miss a Tax Deadline 📅
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Get a friendly email reminder before the official ITR filing deadline next year. Zero spam, just reminders.
        </p>
      </div>

      {status === "success" ? (
        <div className="p-3 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-lg">
          Success! We will email you before the next filing deadline.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 px-3 py-2 text-sm bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900 dark:text-white"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 rounded-lg transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Registering..." : "Remind Me"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-[10px] text-red-500">
          Something went wrong. Please try again later.
        </p>
      )}
    </div>
  );
}
