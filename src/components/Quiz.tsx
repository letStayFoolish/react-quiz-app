import React, { useCallback, useState } from "react";
import QUESTIONS from "../questions.ts";
import quizComplete from "../assets/quiz-complete.png";
import { TAnswerState, type TValueOf } from "../types";
import Question from "./Question.tsx";

/**
 * useRef - utilize to mange value of the state which will not change if component function si executed aging.
 * You can use refs for managing values that are stored and managed independently from the component function life cycle to which they belong.
 */

const Quiz: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [answerState, setAnswerState] =
    useState<TValueOf<typeof TAnswerState>>(""); // "" -> means "not answered" yet!

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const isQuizFinished = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    (selectedAnswer: string | null) => {
      setAnswerState("answered");
      setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

      //  const timeOutId =
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        // const timeId =
        setTimeout(() => {
          setAnswerState("");
        }, 2000);

        // return () => clearTimeout(timeId);
      }, 1000);

      // return () => clearTimeout(timeOutId);
    },
    [activeQuestionIndex],
  );

  console.log({ answerState });

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
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        answerState={answerState}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
      />
    </div>
  );
};

export default Quiz;
