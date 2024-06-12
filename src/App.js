import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component.js";
import EditExercise from "./components/edit-exercise.component.js";
import CreateExercise from "./components/create-exercise.component.js";
import CreateUser from "./components/create-user.component.js";

function App() {
  return (
    <Router>
      <div className = "container">
        <Navbar />
          <br/>
          <Routes>
            <Route path="/" exact Component={ExercisesList} />
            <Route path="/edit/:id" Component={EditExercise} />
            <Route path="/create" Component={CreateExercise} />
            <Route path="/user" Component={CreateUser} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;