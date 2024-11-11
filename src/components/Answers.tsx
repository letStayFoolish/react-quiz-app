import React, { useRef } from "react";
import { TAnswerState, TValueOf } from "../types";

type Props = {
  answers: string[];
  selectedAnswer: string | null;
  answerState: TValueOf<typeof TAnswerState>;
  onSelect: (selectedAnswer: string | null) => void;
};

const Answers: React.FC<Props> = ({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) => {
  const shuffledAnswersRef = useRef<string[]>([]);

  // check if shuffledAnswersRef is null | undefined (that means that we do not have them)
  if (!shuffledAnswersRef.current) {
    // .sort() will not create a new array, instead it will modify the original array
    // That is why is needed to create a new array to be used in combination with sort
    shuffledAnswersRef.current = [...answers];
    shuffledAnswersRef.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {answers.map((answer) => {
        let cssClass = "";
        //                                     last element
        const isSelected = selectedAnswer === answer;

        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }

        return (
          <li className="answer" key={answer}>
            <button
              className={cssClass}
              onClick={() => onSelect(answer)}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
