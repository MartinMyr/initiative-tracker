import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Player from './components/Player';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/player" Component={Player}></Route>
      </Routes>
    </Router>
  )
}

export default App
