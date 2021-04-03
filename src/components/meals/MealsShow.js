import React, { Component } from 'react';
import { Form,Input,Card,Button,DatePicker } from 'antd';
import moment from 'moment';

const { Meta } = Card;

class MealsShow extends Component {
  state  =  {
    name:  null,
    description: '',
    date: 0,
    link: '',
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
        name: data.name,
        description:  data.description,
        date: data.date,
        link: data.link
      })
    })
    .catch(errors => 
      console.log('api  errors: ', errors))
  }

  //TODO: Add default props for Meal.  
  //Filter out  the  meal  id  number  etc. 
  displayMealProperties = () => {
    const { name, description,date,link, edit } = this.state;

    if (name  === null) {
      return(
        <h1>No meal,  fool!</h1>
      )
      
    }
    if (edit === true) {
      return this.displayEditForm()
    }
    if (Object.keys(this.state).length > 0) {
      //Filter Object
      let keys = Object.keys(this.state).filter((e) => {
         if (e !== "edit") {
           return true
         }
      })
      return  keys.map((p,i) =>  { 
        return (
          <p key={i}>{this.state[p]}</p>
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

  handleTextEditChange = (event) =>  {
    const { name, value} =  event.target;
    this.setState({
      [name]: value
    })
  }

  handleDateEditChange = (date, dateString) => {
    console.log(dateString)
    this.setState({
      date: dateString
    })
  }

  submitEditMeal (event) {
    event.preventDefault()
    const { name,description,date, link,edit  } = this.state;
    console.log()
    const token = localStorage.getItem('token')
    const mealId = this.props.mealId;
    
    let  meal =  {
      name: name,
      description: description,
      date: date,
      link: link
    }

    fetch(`http://localhost:3001/meals/${mealId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(meal)
    })
    .then(resp => resp.json())
    .then(data => {
      console.log("success! meal updated")
    })
    .catch(error =>  {
      console.log('api errors: ', error)
    })

    this.setState({
      edit: !edit
    })
  }

  displayEditForm() {
    const  { name,description,link,date } = this.state;

    return (
      <Form
      name="basic"
      initialValues={{ 
        name: name, 
        description: description,
        link: link,
        date: moment(date)
      }}
      
    >
      <Form.Item
        placeholder="name"
        label="name"
        name="name"
        rules={[{ required: true, message: 'Please input a name!' }]}
        onChange={this.handleTextEditChange}
        
      >
        <Input name="name"/>
      </Form.Item>

      <Form.Item
        label="description"
        name="description"
        onChange={this.handleTextEditChange}
      >
        <Input name="description"/>
      </Form.Item>

      <Form.Item
        label="link"
        name="link"
        onChange={this.handleTextEditChange}
      >
        <Input name="link"/>
      </Form.Item>

      <Form.Item
        label="date"
        name="date" 
        
      >
        <DatePicker 
        name="date"
        onChange={this.handleDateEditChange}
        />

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
    console.log(this.state)
    return (
      <div className="meal">
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1296&q=60" />}
          title={this.state.name}
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