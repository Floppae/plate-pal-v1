import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props){
    /*All react component classes that have a constructor
    should start with a super props call*/
    super(props);
    
    //Binding "this" to each of the following methods so "this" will refer to the right thing
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    /*In react, create everything in state 
    so when you update the state, it will automatically 
    update the page with the new values.*/
    this.state = {
      username: ''
    }
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
  onSubmit(e){
    //V prevents default html form submit behavior
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);

    //axios sends http post request to the backend endpoint in '' and the endpoint expects a json objkect in the request body, which we send in as user.
    axios.post('http://localhost:5000/users/add', user).then(res => console.log(res.data));
    //Once exercise added, take user back to homepage
    this.setState({
      username: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}