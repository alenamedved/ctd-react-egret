import React, { useState, useContext } from "react";
import style from './modules/AddTodoForm.module.css'
import { Context } from "./context";
import InputWithLabel from "./InputWithLabel";
import PropTypes from "prop-types"

const AddTodoForm = React.memo(({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");
  const isDark = useContext(Context);
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
    <form onSubmit={handleAddTodo} className={`${style.formElement} ${isDark ? style.formElementDark : null}`}>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
      >
       
      </InputWithLabel>
      <button type="submit" disabled={!todoTitle}>Add</button>
    </form>
  );
})

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
};

export default AddTodoForm;
