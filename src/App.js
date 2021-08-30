import * as React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';



function App() {
  const todoList = [
    {
      id: 1,
      title: 'Clone the ctd-react-egret repo'
    },
    {
      id: 2,
      title: 'Create a new branch and name it lesson-1-1'
    },
    {
      id: 3,
      title: 'Complete the assignment'
    },
    {
      id: 4,
      title: 'Submit a pull request'
    }
  ]

  const [newTodo, setNewTodo] = React.useState('')
 
  
  return (
    <div>
      <h1>To Do List</h1>
        <AddTodoForm onAddTodo={setNewTodo} />
        <p>
          Succesfully added: <strong>{newTodo}</strong>
        </p>
        <TodoList list={todoList} />
    </div>
   
  );
}


export default App
