import React, { useCallback, useState } from "react";
import QUESTIONS from "../questions.ts";
import quizComplete from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.tsx";

const Quiz: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const activeQuestionIndex = userAnswers.length;
  const isQuizFinished = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    (selectedAnswer: string | null) => {
      if (isQuizFinished) return;
      setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
    },
    [isQuizFinished],
  );

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

  // .sort() will not create a new array, instead it will modify the original array
  // That is why is needed to create a new array to be used in combination with sort
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  /**
   * key={}
   * Using `key` prop on components, which aren't part of the list,
   * is useful in situations, whenever this prop changes React will destroy old instance of the component and create the new one!
   * Basically, React will do unmount/re-mount it.
   */

  return (
    <div id="quiz">
      <div id="qiestion">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
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
