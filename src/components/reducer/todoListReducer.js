//actions for reducer function
const actionsTodoListReducer = {
  init: "TODO_INIT",
  fetchSuccess: "FETCH_TODO_SUCCESS",
  fetchFail: "FETCH_TODO_FAILURE",
  removeTodo: "REMOVE_TODO",
  addTodo: "ADD_TODO",
  editRecord: "EDIT_RECORD",
  updateTodoStatus: "APDATE_STATUS",
  clearCompletedTodos: "CLEAR_COMPLETED",
  sortList: "SORT_LIST",
};

const todoListReducer = (state, action) => {
  switch (action.type) {
    case actionsTodoListReducer.fetchSuccess:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };

    case actionsTodoListReducer.fetchFail:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case actionsTodoListReducer.removeTodo:
      return {
        ...state,
        data: state.data.filter((todo) => todo.id !== action.payload),
      };

    case actionsTodoListReducer.addTodo:
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case actionsTodoListReducer.editRecord:
      const index = state.data.findIndex(
        (todo) => todo.id === action.payload.id
      );

      state.data.splice(index, 1, action.payload);
      /* state.data.sort((a,b) => a.fields.Title > b.fields.Title ? 1 : -1) */
      return {
        ...state,
        data: [...state.data],
      };

    case actionsTodoListReducer.updateTodoStatus:
      return {
        ...state,
        data: action.payload,
      };

    case actionsTodoListReducer.clearCompletedTodos:
      return {
        ...state,
        data: action.payload.filter((todo) => !todo.fields.isCompleted),
      };

    case actionsTodoListReducer.sortList:
      return {
        ...state,
        data: action.payload.sort((a, b) =>
          a.fields.Title > b.fields.Title ? 1 : -1
        ),
      };
    default:
      throw new Error();
  }
};

export default todoListReducer;
export { actionsTodoListReducer as actions };
