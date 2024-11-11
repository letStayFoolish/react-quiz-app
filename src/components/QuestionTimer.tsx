import React, { useEffect, useState } from "react";

type Props = {
  onTimeout: () => void;
  timeout: number;
};

const QuestionTimer: React.FC<Props> = ({ timeout, onTimeout }) => {
  const [timeRemaining, setTimeRemaining] = useState(timeout);

  useEffect(() => {
    console.log("SETTING TIMEOUT");
    setTimeout(onTimeout, timeout);

    // cleaner
  }, [onTimeout, timeout]);

  useEffect(() => {
    console.log("SETTING TIME INTERVAL");
    const timeIntervalId = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 100);
    }, 100);

    // return () => clearInterval(timeIntervalId);
  }, []);

  return <progress id="question-time" value={timeRemaining} max={timeout} />;
};

export default QuestionTimer;
