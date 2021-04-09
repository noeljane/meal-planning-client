import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {  Calendar, Badge } from 'antd';

class MealsIndex extends Component {
  state =  {
    meals: []
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
    if (this.state.meals.length > 0 && value) {
      listData = this.state.meals.filter(m => new Date(m.date).getDate() === value.date())
    }
    return listData;
  }

  //Ant Design method for displaying data
  dateCellRender(value) {
    const listData = this.getListData(value)
    
    if (listData.length > 0) {
      return (
        <ul className="events">
          {listData.map(item => {
            let mealIdString =  `/meals/${item.id}`
            return (
              <a href={mealIdString}  key={item.id}>
                <li >
                  <Badge status="success" text={item.name}/>
                </li>
              </a>
            )           
          })}
        </ul>
      )
    }
  }

  //TODO:Do dates need to be  in this??? 
  getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  monthCellRender(value) {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
      </div>
    ) : null;

  }
  
  

  render() {
    console.log("STATE:")
    console.log(this.state)
    return (
      <div>
        <h1>Meals!!</h1>
        <Link  to='/meals/new'>Create a Meal</Link>
        <Calendar dateCellRender={this.dateCellRender.bind(this)} monthCellRender={this.monthCellRender.bind(this)}/>
      </div>
      
    )
  }


}

export default MealsIndex;