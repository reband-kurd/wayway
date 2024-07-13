"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const REQUEST_INTERVAL = null; // Disable interval for single fetch

// Utility function to replace "&quot;" and "&#039;" with double quotes and backticks
const replaceQuot = (text) => {
  return text.replace(/&quot;/g, '"').replace(/&#039;/g, "`");
};

// Utility function to shuffle array in place
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function TestPageContent() {
  const searchParams = useSearchParams();
  const cat = searchParams.get("naw");
  const name = searchParams.get("name");
  console.log(cat);
  const API_URL = `https://opentdb.com/api.php?amount=10&category=${cat}`;
  const [questions, setQuestions] = useState([]); // Array to store all questions
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer
  const [answered, setAnswered] = useState(false); // Track if the question has been answered

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();

        // Process questions to replace "&quot;" and "&#039;" with double quotes and backticks
        const processedQuestions = data.results.map((question) => ({
          ...question,
          question: replaceQuot(question.question),
          answers: shuffleArray([
            ...question.incorrect_answers.map((answer) => replaceQuot(answer)),
            replaceQuot(question.correct_answer),
          ]),
        }));

        setQuestions(processedQuestions);
      } catch (error) {
        setError(error.message); // Set error message
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Fetch data on component mount
  }, [API_URL]); // Add API_URL as dependency

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setAnswered(true); // Mark question as answered

    // Check if answer is correct and update score
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }

    // Automatically move to the next question after 2 seconds
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null); // Reset selected answer
        setAnswered(false); // Reset answered status
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the end state
      }
    }, 2000); // Adjust timing as needed
  };

  const restartTest = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const quitTest = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setQuestions([]); // Clear questions to end the test
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-300 relative">
        <div className="block w-fit p-4 text-lg text-gray-900 rounded-lg border border-gray-300 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          Score: {score}
        </div>
        <div className="text-center">
          <h1
            className="text-4xl font-bold text-gray-900"
            style={{ fontFamily: '"Homemade Apple", cursive' }}
          >
            Quiz Test
          </h1>
          <h1
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: '"Homemade Apple", cursive' }}
          >
            {name}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Answer the following questions:
          </p>
        </div>

        {isLoading && (
          <div className="text-center">
            <p className="text-gray-700">Loading questions...</p>
          </div>
        )}

        {questions.length > 0 && currentQuestionIndex < questions.length && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Question {currentQuestionIndex + 1}
            </h2>
            <p className="mt-2 text-lg text-gray-800">
              {questions[currentQuestionIndex].question}
            </p>

            <div className="mt-6 space-y-4">
              {questions[currentQuestionIndex].answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(answer)}
                  className={`block w-full p-4 text-lg text-gray-900 rounded-lg border border-gray-300 shadow-lg hover:shadow-2xl transition-shadow duration-300 ${
                    selectedAnswer === answer
                      ? answer ===
                        questions[currentQuestionIndex].correct_answer
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-white"
                  }`}
                  disabled={answered}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentQuestionIndex === questions.length && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Test Finished!</h2>
            <p className="mt-2 text-lg text-gray-800">
              Your final score: {score}
            </p>
            <div className="mt-4 space-x-4">
              <button
                onClick={restartTest}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                Restart Test
              </button>
              <Link
                onClick={quitTest}
                className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                href={"/Home"}
              >
                Quit Test
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TestPage(props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TestPageContent {...props} />
    </Suspense>
  );
}
