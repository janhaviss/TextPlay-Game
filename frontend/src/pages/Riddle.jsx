import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const Riddle = () => {
  const resultRef = useRef(null);

  const [status, setStatus] = useState(false);

  const [riddle, setRiddle] = useState(""); // value is set to setRiddle first and then given to riddle for displaying
  const [answer, setAnswer] = useState("");
  const [correctAns, setCorrectAns] = useState("");
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState("");

  const [aiAnswer, setAIAnswer] = useState("");
  const [hint, setHint] = useState(""); // str
  const [aiShown, setAIShown] = useState(false);
  const [hintShown, setHintShown] = useState(false); // bool

  const [error, setError] = useState(null); //numeric

  // fetching first riddle
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/riddles/new", { withCredentials: true })
      .then((res) => {
        setRiddle(res.data.riddle);
      })
      .catch((err) => {
        console.error(err), setError(err);
      });
  }, []);

  // handling user input
  const handleInputChange = (e) => setAnswer(e.target.value);

  // handling answer submit
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/riddles/riddles",
        {
          answer: answer, //sending
        },
        { withCredentials: true }
      );
      // fetching and storing
      setCorrectAns(res.data.correct_answer);
      setScore(res.data.similarity);
      setIsCorrect(res.data.is_correct);
      setStatus(true);
    } catch (error) {
      console.error("Error submitting answer:", error);
      setError(error);
    }
  };

  // generating new riddle
  const newRiddle = () => {
    axios
      .get("http://localhost:5000/api/riddles/new", { withCredentials: true })
      .then((res) => {
        setRiddle(res.data.riddle);
        setAnswer("");
        setStatus(false); // clear previous result
        setCorrectAns("");
        setScore(0);
        setIsCorrect("");
        setAIShown(false);
        setHintShown(false);
      })
      .catch((err) => {
        console.error(err), setError(err);
      });
  };

  // handling ask ai
  const askAI = () => {
    axios
      .get("http://localhost:5000/api/riddles/ask-ai", {
        withCredentials: true,
      })
      .then((res) => {
        setAIAnswer(res.data.answer);
        setAIShown(true);
      })
      .catch((err) => {
        console.error(err), setError(err);
      });
  };

  // handling hint
  const getHint = () => {
    axios
      .get("http://localhost:5000/api/riddles/hint", { withCredentials: true })
      .then((res) => {
        setHint(res.data.hint);
        setHintShown(true);
      })
      .catch((err) => {
        console.error(err), setError(err);
      });
  };

  useEffect(() => {
    if ((status || aiShown || hintShown) && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [status, aiShown, hintShown]);

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

        {/* Main content container with flex for side-by-side layout */}
        <div className="flex flex-col md:flex-row justify-center items-start md:gap-6 gap-4 w-full">
          {/* Stack on mobile, side-by-side on medium screens and up **DIV 3** */}

          {/* LEFT SIDE - Results */}
          <div className="w-full md:w-1/2 h-full md:h-auto bg-white rounded-xl shadow-lg p-6">
            <div className="bg-blue-100 p-6 rounded-md mb-6">
              <p className="font-semibold text-gray-600 mb-3">
                Here's a riddle for you:
              </p>
              <p className="text-xl font-medium text-center">{riddle}</p>
            </div>

            <label className="text-center mb-2 text-md">Your Answer:</label>
            <input
              type="text"
              value={answer}
              onChange={handleInputChange}
              placeholder="Type your answer here"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 mt-3"
            />

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <button
                onClick={handleSubmit}
                className="bg-[#d14d72] text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Submit
              </button>
              <button
                onClick={getHint}
                className="bg-[#27391c] text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Hint
              </button>
              <button
                onClick={askAI}
                className="bg-[#a27b5c] text-white px-4 py-2 rounded hover:bg-yellow-500"
              >
                Ask AI
              </button>
            </div>

            <p className="font-semibold text-gray-600 mb-3 text-center">
              Try another one:
            </p>
            <div className="flex justify-center">
              <button
                onClick={newRiddle}
                className="bg-[#626F47] text-white px-6 py-2 rounded hover:bg-gray-800"
              >
                New Riddle
              </button>
            </div>
          </div>
          {/* <div className="w-1/4 flex-1 bg-[#fff] shadow rounded-lg p-6 pb-0"> */}

          {(status || aiShown || hintShown) && (
            <div className="w-full md:w-1/4 h-auto md:h-auto bg-white shadow rounded-lg p-7 pb-4">
              <h2
                className="text-xl font-bold text-gray-800 mb-4"
                ref={resultRef}
              >
                Result
              </h2>
              <div className="border border-gray-200 p-3 rounded-lg bg-[#dbeafe]">
                {status && (
                  <>
                    <div className="mb-5">
                      {/* <span className="font-medium text-lg text-gray-700">
                        Your Answer is:
                      </span> */}
                      <p
                        className={`font-bold text-xl text-center ${
                          isCorrect ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {isCorrect ? "CORRECT " : "WRONG "}
                      </p>
                    </div>

                    <div className="mb-5">
                      <span className="font-medium text-gray-700 text-start">
                        Actual Answer:
                      </span>
                      <p className="text-blue-800 font-bold">{correctAns}</p>
                    </div>
                    <div className="mb-5">
                      <span className="font-medium text-gray-700 text-center">
                        Similarity Score:
                      </span>
                      <p className="text-green-600 font-bold">{score}</p>
                    </div>
                  </>
                )}
                {aiShown && (
                  <div className="mb-5">
                    <span className="font-medium text-gray-600">AI says:</span>
                    <p className="text-purple-700 font-bold">{aiAnswer}</p>
                  </div>
                )}
                {hintShown && (
                  <div className="mb-5">
                    <span className="font-medium text-gray-600">Hint:</span>
                    <p className="text-yellow-700 font-bold">{hint}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Riddle;
