import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Card,Button } from 'antd';

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
      if (data.error) {
        return
      }
      this.setState({
        meal: data
      })
    })
    .catch(errors => 
      console.log('api  errors: ', errors))
  }

  //TODO: Add default props for Meal.  
  //Filter out  the  meal  id  number  etc. 
  displayMealProperties =  () => {
    const { meal } = this.state;
    if  (Object.keys(meal).length === 0){
      return (
        <h1>This meal has an error or cannot  be found</h1>
      )
    }
    if (Object.keys(meal).length > 0) {
      //Filter Object
      let keys = Object.keys(meal).filter((e) => {
         if (e !== "id" && e  !== "created_at" &&  e!== "updated_at" && e!==  "user_id") {
           return true
         }
      })
      return  keys.map((p,i) =>  {
        if  ( p !== "created_at") {
          return (
            <p key={i}>{meal[p]}</p>
          )
        }  
      }) 
    }
  }

  deleteMeal () {
    console.log("deleting the  meal, fool")
    console.log(this.props)
    const { mealId } = this.props;
    const token = localStorage.getItem('token')
    if (mealId) {
      console.log(`meal id: ${mealId}`)
      fetch(`http://localhost:3001/meals/${mealId}`,{
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then(resp => resp.json())
      .then(data =>  {
        console.log("Boom bananas!")
        console.log(data)
      })
      .catch(error =>  
        console.log('api  errors: ', error))
    }
    //TODO ADD redirect after meal is deleted
    
  }

  render () {
    console.log(this.props);
    const { meal } = this.state;
    return (
      <div className="meal">
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1296&q=60" />}
          title={meal.name}
        >
        {this.displayMealProperties()}
          
        </Card>
        <Button>Edit</Button>
        <Button onClick={this.deleteMeal.bind(this)}>Delete</Button>
        
      </div>
        
        // <h1>{this.state.meal.name}</h1>
        
    )
  }
}

export default MealsShow;