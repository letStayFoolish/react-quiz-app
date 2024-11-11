import React, { useEffect, useState } from "react";
import { TAnswerState } from "../types";

type Props = {
  onTimeout: (() => void) | null;
  timeout: number;
  mode: TAnswerState;
};

const QuestionTimer: React.FC<Props> = ({ timeout, onTimeout, mode }) => {
  const [timeRemaining, setTimeRemaining] = useState(timeout);

  useEffect(() => {
    if (!onTimeout) return;

    const timeoutId = setTimeout(onTimeout, timeout);

    // cleaner
    return () => clearTimeout(timeoutId);
  }, [onTimeout, timeout]);

  useEffect(() => {
    const timeIntervalId = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 100);
    }, 100);

    // Clean up: we have to clean up an interval if it runs again...
    // By cleaning old interval, will have one interval up and running at the same time.
    return () => clearInterval(timeIntervalId);
  }, []);

  return (
    <progress
      id="question-time"
      value={timeRemaining}
      max={timeout}
      className={mode}
    />
  );
};

export default QuestionTimer;
