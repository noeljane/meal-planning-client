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

  // Getting that data, yo!
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

  getListData(value) {
    // From the value put in, return a list where date includes that "day" value
    let listData = [];
    if (this.state.meals.length > 0) {
      listData = this.state.meals.filter(m => new Date(m.date).getDate() === value)
    }
    return listData;
  }
  

  // Make that data pretty
  dateCellRender(value) {
    const listData = this.state.meals;
    if (listData) {
      return (
        <ul className="events">
          {listData.map(item => {
            return (
              <li key={item.name}>
                <Badge status="success"/>
              </li>
            )           
          })}
        </ul>
      )
    }
  }

  monthCellRender(value) {

  }
  
  

  render() {
    console.log("STATE:")
    console.log(this.state)
    console.log("list data length")
    console.log(this.getListData(15))
    return (
      <div>
        <h1>Meals!!</h1>
        <Link  to='/meals/new'>Create a Meal</Link>
        {this.dateCellRender()}
        <Calendar />
      </div>
      
    )
  }


}

export default MealsIndex;