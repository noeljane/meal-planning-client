import React, { Component } from 'react';
import { Form,Input,Card,Button,DatePicker } from 'antd';
import moment from 'moment';

const { Meta } = Card;

class MealsShow extends Component {
  state  =  {
    meal: {},
    edit: false
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
  displayMealProperties = () => {
    const { meal, edit } = this.state;
    if  (Object.keys(meal).length === 0){
      return (
        <h1>This meal has an error or cannot  be found</h1>
      )
    }
    if (edit === true) {
      return this.displayEditForm()
    }
    if (Object.keys(meal).length > 0) {
      //Filter Object
      let keys = Object.keys(meal).filter((e) => {
         if (e !== "id" && e  !== "created_at" &&  e!== "updated_at" && e!==  "user_id") {
           return true
         }
      })
      return  keys.map((p,i) =>  {
        return (
          <p key={i}>{meal[p]}</p>
        )
      }) 
    }
  }

  editMeal () {
    console.log("edit time")
    this.setState({
      edit:!this.state.edit
    })
  }

  submitEditMeal (event) {
    event.preventDefault()
    console.log(event)
    console.log("Form submitted!")

  }

  displayEditForm() {
    const  { meal } = this.state;

    return (
      <Form
      name="basic"
      initialValues={{ 
        name: meal.name, 
        description: meal.description,
        link: meal.link,
        date: moment(meal.date)
      }}
      
    >
      <Form.Item
        label="name"
        name="name"
        rules={[{ required: true, message: 'Please input a name!' }]}
        
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="description"
        name="description"
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="link"
        name="link"
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="date"
        name="date"
      >
        <DatePicker />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit"  onClick={this.submitEditMeal.bind(this)}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    )
  }

  deleteMeal () {
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
        console.log(data)
      })
      .catch(error =>  
        console.log('api  errors: ', error))
    }

    //TODO: Make  this  more react-y
    window.location  = "http://localhost:3000/meals/"    
  }

  render () {
    console.log(this.props);
    const { meal } = this.state;
    console.log(this.state.edit)
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
        <Button onClick={this.editMeal.bind(this)}>Edit</Button>
        <Button onClick={this.deleteMeal.bind(this)}>Delete</Button>
        
      </div>  
    )
  }
}

export default MealsShow;