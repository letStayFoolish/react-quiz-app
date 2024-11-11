import React, { useCallback, useState } from "react";
import QUESTIONS from "../questions.ts";
import quizComplete from "../assets/quiz-complete.png";
import Question from "./Question.tsx";

/**
 * useRef - utilize to mange value of the state which will not change if component function si executed aging.
 * You can use refs for managing values that are stored and managed independently from the component function life cycle to which they belong.
 */

const Quiz: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);

  const activeQuestionIndex = userAnswers.length;
  const isQuizFinished = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback((selectedAnswer: string | null) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  );

  if (isQuizFinished) {
    return (
      <div id="summary">
        <img src={quizComplete} alt="Trophy icon" />
        <h2>Quiz Complete</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
};

export default Quiz;
