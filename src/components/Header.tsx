import React from "react";
import headerImage from "../assets/quiz-logo.png";

type Props = {};

const Header: React.FC = () => {
  return (
    <header>
      <img src={headerImage} alt="Quiz logo" />
      <h1>ReactQuiz</h1>
    </header>
  );
};

export default Header;
