import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const WordAssoc = () => {
  const [guess, setGuess] = useState("");
  const [clues, setClues] = useState("");
  const [target, setTarget] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(null);

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  // handling user input
  const handleInputChange = (e) => {
    setGuess(e.target.value);
    setStatus(false);
    setIsCorrect(false);
  };

  // Fetching clues
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/associate/get_clues", {
        withCredentials: true,
      })
      .then((res) => {
        setClues(res.data.clues);
      })
      .catch((err) => console.error(err));
  }, []);

  // handling user input submit
  const handleSubmit = async () => {
    if (!guess.trim()) {
      alert("Please enter a guess before submitting.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/associate/check_guess",
        {
          guess: guess,
        },
        { withCredentials: true }
      );
      setLoading(false);
      setTarget(res.data.target);
      setIsCorrect(res.data.correct);
      setStatus(true);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  // handling score
  useEffect(() => {
    if (isCorrect) {
      setScore((prev) => (prev !== null ? prev + 1 : 1));
    }
  }, [isCorrect]);

  // handling next clue
  const getClue = () => {
    axios
      .get("http://localhost:5000/api/associate/get_clues", {
        withCredentials: true,
      })
      .then((res) => {
        setClues(res.data.clues);
        setGuess("");
        setIsCorrect("");
        setStatus("");
      });
  };

  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Main Container */}

      <div className="max-w-6xl mx-auto">
        {/* Increased max-width to accommodate side-by-side layout ** DIV 2** */}

        <h1 className="text-3xl md:text-3xl text-center font-bold text-[#d14d72] mb-8">
          Welcome to Game of Word Association!
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-start md:gap-6 gap-4 w-full">
          <div className="w-full md:w-1/2 h-full md:h-auto bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-lg md:text-lg font-medium text-center mb-6 text-gray-600">
              Think fast! Enter the first word that comes to your mind based on
              clues given by the AI.
            </h4>

            <p className="mb-4 text-blue-800 font-medium">
              Clues: {Array.isArray(clues) ? clues.join(", ") : clues}
            </p>

            <label className="text-center mb-2 text-lg font-semibold">
              Your Answer:
            </label>

            <input
              type="text"
              value={guess}
              onChange={handleInputChange}
              placeholder="Type your answer here"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 mt-3"
            />

            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <button
                onClick={handleSubmit}
                className="bg-[#a27b5c] text-white px-4 py-2 rounded hover:bg-[#7B4019]"
              >
                {loading ? "Checking..." : "Submit"}
              </button>
              <button
                onClick={getClue}
                className="bg-[#27391C] text-white px-4 py-2 rounded hover:bg-[#626F47]"
              >
                New Clue
              </button>
            </div>

            {status && (
              <p
                className={`mt-4 text-xl font-bold text-center ${
                  isCorrect ? "text-green-600" : "text-red-500"
                }`}
              >
                {isCorrect ? "CORRECT!" : `Wrong! The answer was "${target}".`}
              </p>
            )}

            {score !== null && (
              <p className="mt-2 text-md font-medium text-blue-600 text-center">
                Current Score: {score}
              </p>
            )}
            <p className="mt-2 text-sm text-gray-400 text-center">
              AI may have low coherency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordAssoc;
