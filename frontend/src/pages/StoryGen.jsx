import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const StoryGen = () => {
  const resultRef = useRef(null);

  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState("");

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // handling user input
  const handleInputChange = (e) => {
    setPrompt(e.target.value);
    setStatus(false);
  };

  // handling user input submit
  const handleSubmit = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt before submitting.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/generate_story",
        {
          prompt: prompt,
        },
        { withCredentials: true }
      );
      setLoading(false);
      setStory(res.data.story);
      setStatus(true);
    } catch (error) {
      console.error("Error submitting answer:", error);
      setError(error);
    }
  };

  const handleClear = () => {
    if (story && prompt) {
      setStory("");
      setPrompt("");
    }
  };

  useEffect(() => {
    if (status && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [status]);

  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Main Container */}

      <div className="max-w-6xl mx-auto">
        {/* Increased max-width to accommodate side-by-side layout ** DIV 2** */}

        {error && ( // Error Div
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-500">!</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div> // Error div closed
        )}

        <h1 className="text-3xl md:text-3xl text-center font-bold text-[#d14d72] mb-8">
          Welcome to Game of Give-Take!
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-start md:gap-6 gap-4 w-full">
          <div className="w-full md:w-1/2 h-full md:h-[60vh] bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-lg md:text-lg font-medium text-center mb-6 text-gray-600">
              Think Carefully! Enter the few words that comes to your mind and
              give it to AI, let's see what it can generate for you? .
            </h4>

            <label className="text-center mb-2 text-lg font-semibold mt-4">
              Enter:
            </label>

            <textarea
              type="text"
              value={prompt}
              onChange={handleInputChange}
              placeholder="Type your prompt here"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 mt-3"
              rows={3}
            ></textarea>

            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <button
                onClick={handleSubmit}
                className="bg-[#a27b5c] text-white px-4 py-2 rounded hover:bg-[#7B4019]"
              >
                {loading ? "Generating..." : "Submit"}
              </button>

              <button
                onClick={handleClear}
                className="bg-[#27391C] text-white px-4 py-2 rounded hover:bg-[#626F47]"
              >
                Clear
              </button>
            </div>
          </div>
          {status && (
            <div className="w-full md:w-1/2 h-auto md:[70vh] bg-white shadow-lg rounded-xl p-8 pb-5">
              <label
                htmlFor="input-text"
                className="block text-md font-medium text-gray-700 mb-2"
              >
                Generated Text:
              </label>
              <div
                id="output-text"
                className={`min-h-auto p-3 border border-gray-400 rounded-md${
                  story ? "text-gray-800" : "text-gray-500"
                }`}
              >
                {story || (
                  <p className="text-gray-500">
                    Your short story text will appear here...
                  </p>
                )}
              </div>
            </div>
          )}
          ;
        </div>
      </div>
    </div>
  );
};

export default StoryGen;
