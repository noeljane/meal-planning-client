import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MealsShow extends Component {
  state  =  {
    meal: {}

  }

  componentDidMount () {
    const mealId = this.props.mealId;
    const token = localStorage.getItem('token')

    fetch(`http://localhost:3001/meals/${mealId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      this.setState({
        meal: data
      })
    })
    

  }

  render () {
    console.log(this.props);
    return (
      <h1>{this.state.meal.name}</h1>
    )
  }
}

export default MealsShow;