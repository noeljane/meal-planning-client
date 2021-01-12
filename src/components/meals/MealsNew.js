import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class MealsNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      date: 0,
      link: '',
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

  handleSubmit = (event) => {
    event.preventDefault();
    const { name,description, date, link  } = this.state;
    const userId  = this.props.user.id;
    const token = localStorage.getItem('token')

    let meal = {
      name: name, 
      description: description,
      date: date,
      link: link,

      userId: userId
    }
    console.log("Here's the meal")
    console.log(meal);

    fetch(`http://localhost:3001/meals`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(meal)
      })
      .then(resp => resp.json())
      .then(data => {
        console.log("success! meal added")
        console.log(data)
      })
      .catch(error  => console.log('api errors: ', error))
    }

  // params.require(:meal).permit(:name, :description, :date, :link_to_recipe, :user_id)
  render() {
    const { name, description, date, link } = this.state;
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
          <input
            placeholder="Link to Recipe"
            type="text"
            name="link"
            value={link}
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