import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {  Calendar, Badge } from 'antd';


class MealsIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meals: []
    }
    
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    fetch(`http://localhost:3001/meals`,  {
      method: 'GET',
      headers: {
        Authorization:`Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      console.log("We got the meals, fool!")
      console.log(data)
      this.setState({
        meals: data
      })
    })
    .catch(error => 
      console.log('api errors: ', error))
  }  

  render() {
    console.log("STATE:")
    console.log(this.state)
    return (
      <div>
        <h1>Meals!!</h1>
        <Link  to='/meals/new'>Create a Meal</Link>

        <Calendar  />
      </div>
      
    )
  }


}

export default MealsIndex;