import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const App = () => {
  const [page, setPage] = useState("List");

  const [questions, setQuestions] = useState([
    {
      id: 1,
      prompt:
        "What special prop should always be included for lists of elements?",
      answers: ["id", "name", "key", "prop"],
      correctIndex: 2,
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((res) => setQuestions(res));
  }, []);

  const addQuestion = (newQuestion) => {
    const config = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    };

    fetch("http://localhost:4000/questions", config)
      .then((response) => response.json())
      .then((newQuestion) => {
        const newQuestions = [...questions, newQuestion];
        setQuestions(newQuestions);
      });
  };

  const deleteQuestion = (id) => {
    const config = {
      method: "DELETE",
    };
    fetch(`http://localhost:4000/questions/${id}`, config)
      .then((response) => response.json())
      .then(() => {
        const newQuestion = questions.filter((filter) => filter.id !== id);
        setQuestions(newQuestion);
      });
  };

  const updateQuestion = (id, updQuestion) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ correctIndex: updQuestion }),
    })
      .then((response) => response.json())
      .then((updQuestion) => {
        const updQuestions = questions.map((dat) => {
          if (dat.id === id) return updQuestion;
          return questions;
        });

        setQuestions(updQuestions);
      });
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm addQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          delQuestion={deleteQuestion}
          updatedQuestion={updateQuestion}
        />
      )}
    </main>
  );
};

export default App;
