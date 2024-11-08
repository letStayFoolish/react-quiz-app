import React, { useState } from "react";
import QUESTIONS from "../questions.ts";

type Props = {};

const Quiz: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const activeQuestionIndex = userAnswers.length;

  const handleSelectAnswer = (selectedAnswer: string) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  };

  return (
    <div id="quiz">
      <div id="qiestion">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
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
