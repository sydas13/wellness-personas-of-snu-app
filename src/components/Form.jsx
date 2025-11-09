import React, { useState } from "react";
import Result from "./Result";

export default function Form() {
  const [formData, setFormData] = useState({
    eating_out_per_week: 1,
    food_budget_per_meal_inr: 50.0,
    sweet_tooth_level: 1,
    weekly_hobby_hours: 0.0,
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let newValue = value;

    if (type === "number" || type === "range") {
      if (name === "eating_out_per_week" || name === "sweet_tooth_level") {
        newValue = parseInt(value, 10); // integers only
      } else {
        newValue = parseFloat(value); // decimal numbers allowed
      }
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    setMessage("");

    try {
      const response = await fetch(
        "https://wellness-persona-api-2.onrender.com/predict_persona",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send data");
      }

      const result = await response.json();
      console.log("✅ API Response:", result);
      setResult(result);
      setMessage("Form submitted successfully!");
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      setError(true);
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleRestart = () => {
    setFormData({
      eating_out_per_week: 1,
      food_budget_per_meal_inr: 50.0,
      sweet_tooth_level: 1,
      weekly_hobby_hours: 0.0,
    });
    setResult(null);
    setMessage("");
    setError(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {!result && !error && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl space-y-6"
        >
          <p>first submission will take atleast 50s to show the result</p>
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-10">
            Eating & Lifestyle Form
          </h2>

          {/* 1. Eating Out Per Week */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Eating Out Per Week (1–10)
            </label>
            <input
              type="number"
              name="eating_out_per_week"
              value={formData.eating_out_per_week}
              min="1"
              max="10"
              step="1"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* 2. Food Budget Per Meal */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Food Budget Per Meal (₹50.0–₹90000.0)
            </label>
            <input
              type="number"
              name="food_budget_per_meal_inr"
              value={formData.food_budget_per_meal_inr}
              min="50"
              max="90000"
              step="0.1"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* 3. Sweet Tooth Level */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Sweet Tooth Level (1–5)
            </label>
            <input
              type="range"
              name="sweet_tooth_level"
              value={formData.sweet_tooth_level}
              min="1"
              max="5"
              step="1"
              onChange={handleChange}
              className="w-full accent-pink-500"
            />
            <p className="text-sm text-gray-600 mt-1">
              Current: {formData.sweet_tooth_level}
            </p>
          </div>

          {/* 4. Weekly Hobby Hours */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Weekly Hobby Hours (0.0–120.0)
            </label>
            <input
              type="number"
              name="weekly_hobby_hours"
              value={formData.weekly_hobby_hours}
              min="0"
              max="120"
              step="0.1"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors cursor-pointer"
          >
            Submit
          </button>
        </form>
      )}

      {/* {result && (
        <div className="bg-white mt-6 p-6 shadow-lg rounded-2xl text-center max-w-md w-full">
          <p className="mb-3">{message}</p>

          <h2 className="text-xl font-semibold text-gray-800">
            Persona: {result.persona_name}
          </h2>
          <p className="text-gray-600 mt-2">{result.health_advice}</p>
          <button
            onClick={handleRestart}
            className="mt-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition"
          >
            Restart
          </button>
        </div>
      )}
      {error && (
        <div className="bg-white mt-6 p-6 shadow-lg rounded-2xl text-center max-w-md w-full">
          <p className="mb-3">{message}</p>
          <button
            onClick={handleRestart}
            className="mt-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition"
          >
            Restart
          </button>
        </div>
      )} */}
      <Result
        error={error}
        result={result}
        message={message}
        handleRestart={handleRestart}
      />
    </div>
  );
}
