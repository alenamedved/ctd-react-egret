import React from "react";
import TodoListItem from "./TodoListItem";
import style from "./modules/TodoList.module.css";
import PropTypes from "prop-types";

const TodoList = React.memo(
  ({
    todoList,
    onRemoveTodo,
    onEditTodo,
    changeTodoStatus,
    todoStatusDone,
  }) => {
    return (
      <ul className={style.ulContainer}>
        {todoList.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            onEditTodo={onEditTodo}
            changeTodoStatus={changeTodoStatus}
            todoStatusDone={todoStatusDone}
          />
        ))}
      </ul>
    );
  }
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      fields: PropTypes.shape({
        isCompleted: PropTypes.bool,
        Title: PropTypes.string,
      }),
    })
  ),
  onRemoveTodo: PropTypes.func,
  onEditTodo: PropTypes.func,
  changeTodoStatus: PropTypes.func,
  todoStatusToBeDone: PropTypes.string,
  todoStatusDone: PropTypes.bool,
};

export default TodoList;
