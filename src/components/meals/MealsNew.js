import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class MealsNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      date: 0,
      userId: ''
      //get user from props???
    }
  }

  componentDidMount() {

  }
  
  handleChange = (event) => {
    const { name, value} = event.target;
    this.setState({
      [name]: value
    })
  }

  //TODO: Add axios for creating new meal
  handleSubmit = (event) => {
    event.preventDefault();
    const { name,description, date  } = this.state;
    const userId  = this.props.user.id;

    let meal = {
      name: name, 
      description: description,
      date: date,
      userId: userId
    }
    console.log("Here's the meal")
    console.log(meal);

    axios.post('http://localhost:3001/meals', {meal})
      .then(response => {
        console.log("success!!");
        console.log(response);
      })
      .catch(error => console.log('api errors:', error))
  
    console.log(this.state);
  }

  // params.require(:meal).permit(:name, :description, :date, :link_to_recipe, :user_id)
  render() {
    const { name, description,date } = this.state;
    console.log("Props for meal form:");
    console.log(this.props);
    return (
      <div>
        <h1>Add a meal, fool!</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="name"
            type="text"
            name="name"
            value={name}
            onChange= {this.handleChange}
          />
          <input
            placeholder="description"
            type="text"
            name="description"
            value={description}
            onChange= {this.handleChange}
          />
          <input
            placeholder="Date to Cook"
            type="date"
            name="date"
            value={date}
            onChange= {this.handleChange}>
          </input>

        <button
          placeholder="submit"
          type="submit">
          Add this meal
        </button>
        </form>
      </div>
    )
  }
}

export default MealsNew;