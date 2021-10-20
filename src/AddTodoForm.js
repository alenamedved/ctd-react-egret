import React from "react";
import { useState } from "react/cjs/react.development";
import InputWithLabel from "./InputWithLabel";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  //update the todoTitle state with input value
  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  //function to pass a new title to the todolist as an obj
  const handleAddTodo = (event) => {
    //prevent a default behavior from submit
    event.preventDefault();
    onAddTodo(todoTitle);
    // reset the todoTitle state to an empty String
    setTodoTitle("");
  };

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
      >
        Title:
      </InputWithLabel>
      <button type="submit" disabled={!todoTitle}>
        Add
      </button>
    </form>
  );
}

export default AddTodoForm;
