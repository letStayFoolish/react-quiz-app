import React, { useState } from "react";
import QuestionTimer from "./QuestionTimer.tsx";
import Answers from "./Answers.tsx";
import { TAnswerState } from "../types";
import QUESTIONS from "../questions.ts";

/**
 * key={}
 * Using `key` prop on components, which aren't part of the list,
 * is useful in situations, whenever this prop changes React will destroy old instance of the component and create the new one!
 * Basically, React will do unmount/re-mount it.
 */

type Props = {
  onSelectAnswer: (selectedAnswer: string | null) => void;
  onSkipAnswer: () => void;
  index: number;
};

type TAnswer = {
  selectedAnswer: string | null;
  isCorrect: boolean | null;
};

const Question: React.FC<Props> = ({ onSelectAnswer, onSkipAnswer, index }) => {
  const [answer, setAnswer] = useState<TAnswer>({
    selectedAnswer: "",
    isCorrect: null,
  });

  const handleSelectAnswer = (answer: string | null) => {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null, // don't know yet
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  };

  let answerState: TAnswerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="qiestion">
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;
