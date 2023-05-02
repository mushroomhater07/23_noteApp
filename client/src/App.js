import React, { Component, useState, useRef, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './web/NavBar';
import Home from './web/Home';
import "./app.css";
import Noteid from './web/noteid';
import Todo from './web/Todo';

export default function App(){
  // const[todo, setTodo] = useState([]);
  // const todoNameRef = useRef()


  // useEffect(() => {
  //   const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  //   if (storedTodos) setTodos(storedTodos)
  // }, [])
  // useEffect(() => { localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)) }, [todos])

  return(<><NavBar/>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/:id">
            <Route index element={<Noteid/>}/>
            <Route path='edit' element={<h1>edit</h1>}/>
          </Route>
          <Route path="*" element={<Navigate to="/" />}/>
          <Route path="todo" element={<Todo/>}/>
        </Routes>
      </BrowserRouter>
      </>
    );
}

// class App extends Component {
//   render() {
//     return ()}}

