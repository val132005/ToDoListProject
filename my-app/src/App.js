
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeLogged from './pages/HomeLogged';
import HomeNonLogged from './pages/HomeNonLogged';
import Login from './pages/Login';
import { ApolloProvider } from '@apollo/client';
import client from './config/apolloClient';
import ToDoList from './pages/ToDoList';
import CreateNewItem from './pages/CreateNewItem.js';



const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/homeLogged/todolist" element={<ToDoList />} />
          <Route path="/homeLogged/todolist/createnewitem" element={<CreateNewItem />} />
          <Route path="/" element={<HomeNonLogged />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homeLogged" element={<HomeLogged />} />
          <Route path="/toDoList" element={<ToDoList />} />


        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;

