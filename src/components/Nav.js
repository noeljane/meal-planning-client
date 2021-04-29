import React,  { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Menu } from 'antd';
import Login from './registrations/Login';
import Signup from './registrations/Signup';


class Nav extends Component {
  //Show logout if logged in
  //Show  login if logged out
  loginDisplay = () => {
    if (localStorage.getItem('token')) {
      return (
        <Menu  mode="horizontal">
          <Menu.Item><a href="/logout">Logout</a></Menu.Item>
          <Menu.Item><a href="/meals/new">Add Meals</a></Menu.Item>
          <Menu.Item><a href="/meals/">Meal Calendar</a></Menu.Item>
        </Menu>
      )
    }
    else  {
      return (
        <BrowserRouter>
          <Switch>
          <Route 
              exact path='/login' 
              render={props => (
                <Login {...props} handleLogin={this.handleLogin} />
              )} 
            />
            <Route 
              exact path='/signup' 
              render={props => (
                <Signup {...props} handleLogin={this.handleLogin} />
              )}
            />
          </Switch>
        </BrowserRouter>
      )
    }
  }
render ()  {
  console.log("Props for nav bar")
  console.log(this.props)
  return (
    <div>
      {this.loginDisplay()}
    </div>
  )
}
}
export default Nav;