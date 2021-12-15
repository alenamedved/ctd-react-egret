import React, {useContext} from "react";
import { Context } from "./context";
import style from "./modules/TodoListItem.module.css";
import PropTypes from "prop-types";

//Function to get a current time
function getTime(date) {
  const dateCreated = new Date(date);
  const options = {
    weekday: "short",
    /* year: "numeric", */
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  //to get rid of ',' use split and join methods
  return dateCreated.toLocaleString(undefined, options).split(",").join(" ");
}

const TodoListItem = React.memo(
  ({ todo, onRemoveTodo, onEditTodo, changeTodoStatus, todoStatusDone }) => {
    const handleClick = (e) => {
      if (e.target.innerText === "Edit") {
        e.target.parentNode.querySelector("p").contentEditable = true;
        e.target.parentNode.querySelector("p").style.backgroundColor = "white";
        e.target.innerText = "Save";
      } else {
        e.target.parentNode.querySelector("p").contentEditable = false;
        e.target.parentNode.querySelector("p").style.backgroundColor =
          "initial";
        e.target.innerText = "Edit";
        const editedValue = e.target.parentNode.querySelector("p").innerText;
        onEditTodo(todo.id, editedValue);
      }
    };
    const checked = todo.fields.isCompleted === todoStatusDone;
    /* console.log(context) */
    const isDark = useContext(Context);
    /* console.log(todo) */
    return (
      <>
        <li className={`${style.listItem} ${isDark ? style.listItemDark : null}`}>
          <input
            type="checkbox"
            defaultChecked={checked}
            onClick={() => changeTodoStatus(todo.id)}
          />
          <span className={style.container}>
            <p
              style={{
                textDecoration:
                  todo.fields.isCompleted === todoStatusDone
                    ? "line-through"
                    : "",
                color:
                  todo.fields.isCompleted === todoStatusDone
                    ? "gray"
                    : "",
              }}
            >
              {todo.fields.Title}
            </p>
            <p className={style.createdTimeP}>
              Added on:{getTime(todo.createdTime)}
            </p>
          </span>
          <button
            className={`${style.removeBtn} ${style.btn} ${isDark ? style.btnDark : ''}`}
            onClick={() => onRemoveTodo(todo.id, !!todo.fields.isCompleted)}
          >
            ✖
          </button>
          <button
            className={`${style.editBtn} ${style.btn} ${isDark ? style.btnDark : ''}`}
            onClick={handleClick}
          >
            Edit
          </button>
        </li>
      </>
    );
  }
);

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    fields: PropTypes.shape({
      isCompleted: PropTypes.bool,
      Title: PropTypes.string,
    }),
  }),
  onRemoveTodo: PropTypes.func,
  onEditTodo: PropTypes.func,
  changeTodoStatus: PropTypes.func,
  todoStatusDone: PropTypes.bool,
};

export default TodoListItem;
