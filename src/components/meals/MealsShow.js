import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

const { Meta } = Card;

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
      <div className="meal">
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1296&q=60" />}
        >
          <Meta title={this.state.meal.name} description={this.state.meal.description
          }
           />
        </Card>
      </div>
        
        // <h1>{this.state.meal.name}</h1>
      
    )
  }
}

export default MealsShow;