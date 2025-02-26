import { StrictMode } from 'react';
//import { createRoot } from 'react-dom/client';
import ReactDOM from "react-dom";

import { useState, useEffect } from 'react';
import './index.css';
import { openDB, deleteDB } from 'idb';

async function upgradeToV1(db) {
  db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true });
}

async function getDbPromise() {
  return openDB('to-do-app-db', 1, { upgrade: upgradeToV1 });
}

const DB_PROMISE = getDbPromise();

const db = {
  async add(todo) {
    const db = await DB_PROMISE;
    const tx = db.transaction('todos', 'readwrite');
    const store = tx.objectStore('todos');
    store.add(todo);
    await tx.done;
  },
  async getAll() {
    const db = await DB_PROMISE;
    const tx = db.transaction('todos', 'readonly');
    const store = tx.objectStore('todos');
    return store.getAll();
  },
  async remove(id) {
    const db = await DB_PROMISE;
    const tx = db.transaction('todos', 'readwrite');
    const store = tx.objectStore('todos');
    store.delete(id);
    await tx.done;
  },
  async update(todo) {
    const db = await DB_PROMISE;
    const tx = db.transaction('todos', 'readwrite');
    const store = tx.objectStore('todos');
    store.put(todo);
    await tx.done;
  },
  async clear() {
    const db = await DB_PROMISE;
    const tx = db.transaction('todos', 'readwrite');
    const store = tx.objectStore('todos');
    store.clear();
    await tx.done;
  },
};

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    db.getAll().then(setTodos);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      text: new FormData(e.target).get("todo-text"),
    };
    db.add(newTodo).then(db.getAll).then(setTodos);
  }

  const todoremover = (todo) => () => {
    db.remove(todo.id).then(db.getAll).then(setTodos);
  };

  const todoUpdater = (todo) => () => {
    db.update(todo).then(db.getAll).then(setTodos);
  };

  const clearTodo = () =>
    db.clear().then(db.getAll).then(setTodos);

  return (
    <main>
      <h1>To Do App</h1>
      <SingleTextInputForm onSubmit={handleSubmit} inputname="todo-text" buttonText="Add" />
      <button onClick={clearTodo}>Clear All To Do Items</button>
      <h2>To Do List</h2>
      <ul>
        {todos.map((todo) => (
          <TodolistItem key={todo.id} {...{ todo, todoremover, todoUpdater }} />
        ))}
      </ul>
    </main>
  );
}

function TodolistItem({ todo, todoremover, todoUpdater }) {
  const { id, text } = todo;
  const [editing, setIsEditing] = useState(false);
  const inputname = "updater-todo-text";

  function onSubmit(e) {
    e.preventDefault();
    const newText = new FormData(e.target).get(inputname);
    const newTodo = { id, text: newText };
    todoUpdater(newTodo)();
    setIsEditing(false);
  }

  if (editing) {
    return (
      <li key={id}>
        <SingleTextInputForm onSubmit={onSubmit} inputname={inputname} buttonText="Save" placeholder={text} defaultValue={text} />
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </li>
    );
  }

  return (
    <li key={id}>
      <span>{text}</span>
      <button onClick={todoremover(todo)}>Delete</button>
      <button onClick={() => setIsEditing(true)}>Edit</button>
    </li>
  );
}

function SingleTextInputForm({ onSubmit, inputname, buttonText, placeholder, defaultValue }) {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name={inputname} placeholder={placeholder} defaultValue={defaultValue} required autoComplete="off" pattern=".*\S+.*" />
      <button type="submit">{buttonText}</button>
    </form>
  );
}

//createRoot(document.querySelector("body")).render(
 // <StrictMode>
  //  <App />
  // </StrictMode>

  ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
