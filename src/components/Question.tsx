import React, { useState } from "react";
import QuestionTimer from "./QuestionTimer.tsx";
import Answers from "./Answers.tsx";
import { TAnswerState } from "../types";
import QUESTIONS from "../questions.ts";

/**
 * key={}
 * Using `key` prop on components, which aren't part of the list,
 * is useful in situations, whenever this prop changes React will destroy old instance of the component and create the new one!
 * Basically, React will do unmount/re-mount it. => Forcing Component to re-execute again
 */

type Props = {
  onSelectAnswer: (selectedAnswer: string) => void;
  onSkipAnswer: () => void;
  index: number;
};

type TAnswer = {
  selectedAnswer: string;
  isCorrect: boolean | null;
};

const Question: React.FC<Props> = ({ onSelectAnswer, onSkipAnswer, index }) => {
  const [answer, setAnswer] = useState<TAnswer>({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 3000; //ms

  if (answer.selectedAnswer) {
    timer = 1000; //ms
  }

  if (answer.isCorrect !== null) {
    timer = 2000; //ms
  }

  const handleSelectAnswer = (answer: string) => {
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
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null} // trigger this function no answers is selected
        mode={answerState}
      />
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
