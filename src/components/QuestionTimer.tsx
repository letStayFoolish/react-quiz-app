import React, { useEffect, useState } from "react";

type Props = {
  onTimeout: () => void;
  timeout: number;
};

const QuestionTimer: React.FC<Props> = ({ timeout, onTimeout }) => {
  const [timeRemaining, setTimeRemaining] = useState(timeout);

  useEffect(() => {
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

  return <progress id="question-time" value={timeRemaining} max={timeout} />;
};

export default QuestionTimer;
