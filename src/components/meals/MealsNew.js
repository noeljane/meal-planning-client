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
      linkToRecipe: '',
      //get user from props???
    }
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
    console.log('submitted!')
    console.log(this.state);
  }

  // params.require(:meal).permit(:name, :description, :date, :link_to_recipe, :user_id)
  render() {
    const { name, description,date } = this.state
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