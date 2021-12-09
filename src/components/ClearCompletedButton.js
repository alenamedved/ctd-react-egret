import React from "react";
import style from "./modules/ClearCompleted.module.css";

const ClearCompletedButton = ({ clearCompleted, tobeRemoved }) => {
  
  return (
    <button
      className={
        tobeRemoved === 0
          ? style.clearCompInvisible
          : style.clearCompletedButton
      }
      onClick={clearCompleted}
    >
      Clear Completed
    </button>
  );
};

export default ClearCompletedButton;
