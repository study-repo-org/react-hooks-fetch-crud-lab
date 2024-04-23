import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:4000/questions"); // Assuming your endpoint is /api/questions
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  

  const handleDeleteQuestion = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Remove deleted question from the list
        setQuestions(questions.filter((question) => question.id !== id));
        console.log("Question deleted successfully");
      } else {
        console.error("Failed to delete question");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

 
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
         
        />
      )}
    </main>
  );
}

export default App;
