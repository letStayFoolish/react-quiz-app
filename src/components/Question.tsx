import React from "react";
import QuestionTimer from "./QuestionTimer.tsx";
import Answers from "./Answers.tsx";
import { TAnswerState, TValueOf } from "../types";

/**
 * key={}
 * Using `key` prop on components, which aren't part of the list,
 * is useful in situations, whenever this prop changes React will destroy old instance of the component and create the new one!
 * Basically, React will do unmount/re-mount it.
 */

type Props = {
  questionText: string;
  answers: string[];
  answerState: TValueOf<typeof TAnswerState>;
  onSelectAnswer: (selectedAnswer: string | null) => void;
  onSkipAnswer: () => void;
  selectedAnswer: string | null;
};

const Question: React.FC<Props> = ({
  questionText,
  answers,
  answerState,
  onSelectAnswer,
  onSkipAnswer,
  selectedAnswer,
}) => {
  return (
    <div id="qiestion">
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
};

export default Question;
