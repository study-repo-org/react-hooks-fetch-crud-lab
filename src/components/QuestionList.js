import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, delQuestion, updatedQuestion }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} delQuestion={delQuestion} updatedQuestion={updatedQuestion} />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
