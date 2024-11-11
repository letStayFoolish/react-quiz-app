import React from "react";
import quizComplete from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.ts";

type Props = {
  userAnswers: string[];
};

const Summary: React.FC<Props> = ({ userAnswers }) => {
  const skippedAnswers = userAnswers.filter((answer) => answer === "");
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0],
  );

  const skippedAnswerShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100,
  );
  const correctAnswerShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100,
  );
  const wrongAnswersShare = 100 - skippedAnswerShare - correctAnswerShare;

  return (
    <div id="summary">
      <img src={quizComplete} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswerShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswerShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {/* Try to avoid using index as a key. Because in that case key is not related to the data, but to the position of the data in the array. */}
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";

          if (answer == "") {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }

          const result = answer === "" ? "Skipped" : answer;

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{result}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Summary;
