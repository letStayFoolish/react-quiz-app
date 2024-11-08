import React, { useState } from "react";
import QUESTIONS from "../questions.ts";
import quizComplete from "../assets/quiz-complete.png";
type Props = {};

const Quiz: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const activeQuestionIndex = userAnswers.length;

  const isQuizFinished = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = (selectedAnswer: string) => {
    if (isQuizFinished) return;
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  };

  if (isQuizFinished) {
    return (
      <div id="summary">
        <img src={quizComplete} alt="Trophy icon" />
        <h2>Quiz Complete</h2>
      </div>
    );
  }

  // .sort() will not create a new array, instead it will modify the original array
  // That is why is needed to create new array to be used in combination with sort
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="qiestion">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li className="answer" key={answer}>
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
