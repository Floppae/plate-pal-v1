import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
/*npm install bootstrap for css
npm install react-date-picker
npm install react-router-dom for routes
npm install axios to connect frontend to backend*/
export default class CreateExercise extends Component {
  constructor(props){
    /*All react component classes that have a constructor
    should start with a super props call*/
    super(props);
    
    //Binding "this" to each of the following methods so "this" will refer to the right thing
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    /*In react, create everything in state 
    so when you update the state, it will automatically 
    update the page with the new values.*/
    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),

      /*Reason for users: on our page, 
      theres gonna be a dropdown menu 
      where you can select all of the users
       that are already in the database*/
      users: []
    }
  }

  componentDidMount(){
    //React lifecycle method
    //automatically be called right before anything displays
    //Gonna run this before CreateExerciseComponent page loads
    axios.get('http://localhost:5000/users/').then(response => {
      if (response.data.length > 0){
        this.setState({
          users: response.data.map(user => user.username),
          username: response.data[0].username
        })
      }
    })
  }

  onChangeUsername(e) {
    /*Never do this.state.username = "geag"
    Always use the setstate method in react
    ~Target = textbox. Setting username = textbox value*/
    this.setState({
      username: e.target.value
      //This doesn't replace the entirety of state, it just modifies the username element
    })
  }
  onChangeDescription(e) {
    /*Never do this.state.username = "geag"
    Always use the setstate method in react
    ~Target = textbox. Setting username = textbox value*/
    this.setState({
      description: e.target.value
    })
  }
  onChangeDuration(e) {
    /*Never do this.state.username = "geag"
    Always use the setstate method in react
    ~Target = textbox. Setting username = textbox value*/
    this.setState({
      duration: e.target.value
    })
  }
  onChangeDate(date) {
    /*Never do this.state.username = "geag"
    Always use the setstate method in react
    ~Target = textbox. Setting username = textbox value*/
    this.setState({
      date: date
    })
  }

  onSubmit(e){
    //V prevents default html form submit behavior
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/add', exercise).then(res => console.log(res.data));


    //Once exercise added, take user back to homepage
    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}