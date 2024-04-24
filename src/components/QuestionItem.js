import React from "react";

function QuestionItem({ question , delQuestion, updatedQuestion }) {

  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));


  function handleDelClick(){
    delQuestion(id);
  }

  function handleUpdClick(event){
    const newCorrAns = event.target.value;
    updatedQuestion(id,newCorrAns);
  }


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onClick={handleUpdClick}>{options}</select>
      </label>
      <button onClick={handleDelClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
