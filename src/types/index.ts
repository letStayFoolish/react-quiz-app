export type TQuestion = {
  id: string;
  text: string;
  answers: string[];
};

export const TAnswerState = {
  NotAnswered: "",
  Answered: "answered",
  Wrong: "wrong",
  Correct: "correct",
} as const;

export type TValueOf<T> = T[keyof T];
