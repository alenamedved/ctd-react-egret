import React, { useContext, useEffect, useReducer, useState } from "react";
import style from "./modules/ListContainer.module.css";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import todoListReducer, { actions } from "./reducer/todoListReducer";
import FilterButton from "./buttons/FilterButton";
import SortingCheckbox from "./SortingCheckbox";
import PropTypes from "prop-types";
import ClearCompletedButton from "./buttons/ClearCompletedButton";
import { Context } from "./context/context";

const todoStatusDone = true;

//object where the keys are filter values and values are functions to be passed to filter method
const FILTER_MAP = {
  All: () => true,
  Active: (todo) => !todo.fields.isCompleted,
  Completed: (todo) => todo.fields.isCompleted === todoStatusDone,
};
//object that consist of only filter names
const FILTER_NAMES = Object.keys(FILTER_MAP);

//custom hook
const useSemiPersistentState = (listName, token) => {
  const [todoList, dispatchTodoList] = useReducer(todoListReducer, {
    data: [], //use an empty string as an initial state
    isLoading: true,
    isError: false,
  });
  const [filter, setFilter] = React.useState("All"); //init filter with 'All' to see all tasks
  const [sortChecked, setSortChecked] = useState(false);

  useEffect(() => {
    fetch(
      `/.netlify/functions/fetchTable?todoCategory=${encodeURIComponent(
        listName
      )}&token=${token}`
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (sortChecked) {
          result.records.sort((a, b) =>
            a.fields.Title.toLowerCase() > b.fields.Title.toLowerCase() ? 1 : -1
          );
        } else {
          result.records.sort((a, b) =>
            a.createdTime > b.createdTime ? 1 : -1
          );
        }

        const data = result.records.filter(FILTER_MAP[filter]);
        dispatchTodoList({
          type: actions.fetchSuccess,
          payload: data,
        });
      })
      .catch(() => dispatchTodoList({ type: actions.fetchFail }));
  }, [listName, filter, sortChecked, token]);

  return [
    todoList,
    dispatchTodoList,
    filter,
    setFilter,
    sortChecked,
    setSortChecked,
  ];
};

function ListContainer({ listName, handleUpdate, token }) {
  const [
    todoList,
    dispatchTodoList,
    filter,
    setFilter,
    sortChecked,
    setSortChecked,
  ] = useSemiPersistentState(listName, token);

  const isDark = useContext(Context);

  //track the quantity of completed todos
  const [doneTodos, setDoneTodos] = useState([]);

  //update doneTodos every time todoList updates
  useEffect(() => {
    //filter all done todos
    const tobeRemoved = todoList.data.filter((todo) => todo.fields.isCompleted);

    setDoneTodos(tobeRemoved);
  }, [todoList]);

  //add new todo to the list at Airtable and todoList
  const addTodo = (newTodo) => {
    fetch(
      `/.netlify/functions/addItem?todoCategory=${listName}&newTodo=${newTodo}`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatchTodoList({
          type: actions.addTodo,
          payload: data.records[0],
        });
        if (filter === "All" || filter === "Active") {
          if (sortChecked) {
            todoList.data.push(data.records[0]);
            dispatchTodoList({
              type: actions.sortList,
              payload: todoList.data,
            });
          }
        }

        handleUpdate(listName, +1);
      })
      .catch(() => dispatchTodoList({ type: actions.fetchFail }));
  };

  //remove todo from Airtable and todoList
  const removeTodo = (id, isCompleted) => {
    fetch(`/.netlify/functions/removeItem?todoCategory=${listName}&id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        dispatchTodoList({
          type: actions.removeTodo,
          payload: data.records[0].id,
        });
        if (!isCompleted && isCompleted !== undefined) {
          handleUpdate(listName, -1);
        }
      })
      .catch(() => dispatchTodoList({ type: actions.fetchFail }));
  };

  //edit todo at Airtable and todoList
  const editTodo = (id, value) => {
    editTodoRecord(listName, id, value);
  };

  //func to edit todo record (Title value or isCompleted value)
  function editTodoRecord(listName, id, value, status) {
    fetch(
      `/.netlify/functions/editRecord?todoCategory=${encodeURIComponent(
        listName
      )}&id=${id}&value=${value}&status=${status}`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatchTodoList({
          type: actions.editRecord,
          payload: data.records[0],
        });
        if (sortChecked) {
          dispatchTodoList({
            type: actions.sortList,
            payload: todoList.data,
          });
        }
      })
      .catch(() => dispatchTodoList({ type: actions.fetchFail }));
  }
  //change todo status at Airtable and todoList
  const changeTodoStatus = (id) => {
    const copyTodoList = todoList.data;
    copyTodoList.forEach((todo) => {
      if (todo.id === id) {
        if (!todo.fields.isCompleted) {
          todo.fields.isCompleted = todoStatusDone;
          handleUpdate(listName, -1);
        } else {
          todo.fields.isCompleted = !todoStatusDone;
          handleUpdate(listName, 1);
        }

        const status = todo.fields.isCompleted;
        const value = undefined;
        editTodoRecord(listName, todo.id, value, status);
      }
    });
    dispatchTodoList({
      type: actions.updateTodoStatus,
      payload: copyTodoList,
    });
  };

  //clear completed todo function
  const clearCompleted = () => {
    const idsTobeRemoved = [];

    doneTodos.forEach((item) => {
      idsTobeRemoved.push(item.id);
    });

    removeTodo(idsTobeRemoved);

    dispatchTodoList({
      type: actions.clearCompletedTodos,
      payload: todoList.data,
    });
  };

  return (
    <div
      className={`${style.listContainer} ${
        isDark ? style.listContainerDark : null
      }`}
    >
      <h1>{listName}</h1>
      <SortingCheckbox setSortChecked={setSortChecked} />

      {todoList.isError && <p>Something went wrong ...</p>}

      {todoList.isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {todoList.data[0] ? null : filter !== "Completed" ? (
            <p>
              <strong>Lets add some items to tasks !</strong>
            </p>
          ) : (
            <p>
              <strong>Change the filter to see your tasks list.</strong>
            </p>
          )}
          <TodoList
            todoList={todoList.data}
            onRemoveTodo={removeTodo}
            onEditTodo={editTodo}
            changeTodoStatus={changeTodoStatus}
            todoStatusDone={todoStatusDone}
          />
          <AddTodoForm onAddTodo={addTodo} />
          <div style={{ display: "flex" }}>
            {FILTER_NAMES.map((name) => (
              <FilterButton
                key={name}
                name={name}
                isPressed={name === filter}
                setFilter={setFilter}
              />
            ))}
          </div>
          <ClearCompletedButton
            clearCompleted={clearCompleted}
            tobeRemoved={doneTodos.length}
          />
        </>
      )}
    </div>
  );
}

ListContainer.propTypes = {
  listName: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default ListContainer;
