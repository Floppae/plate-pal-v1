import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//2 Components in this file: Exercise and ExercisesList
const Exercise = props => (//Functional React Component
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {//Class Component
  constructor(props) {
    super(props); //always start with this

    this.deleteExercise = this.deleteExercise.bind(this);
    
    this.state = {exercises: []};
  }

componentDidMount(){
  //grabbing info from databse before page loads
  axios.get('http://localhost:5000/exercises/')
  .then(response => {
    this.setState({exercises: response.data})
  })
  .catch((error) => {
    console.log(error);
  })
}

deleteExercise(id) {
  axios.delete('http://localhost:5000/exercises/'+id)
    .then(response => { console.log(response.data)});

  this.setState({
    exercises: this.state.exercises.filter(el => el._id !== id)
  })
}

exerciseList() {//For every element in the exercises array, it will return a component and the component will be a row of the table
  return this.state.exercises.map(currentexercise => { //Passing in 3 "props" exercise,deleteExercise,key
    return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
  })
}

render() {
  return (
    <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}