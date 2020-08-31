import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/registrations/Login';
import Signup from './components/registrations/Signup';
import LogOut from './components/registrations/Logout'
import MealsIndex from './components/meals/MealsIndex';
import MealsNew from './components/meals/MealsNew';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      form: ''
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if(token) {
      fetch(`http://localhost:3001/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          user: data
        })
      })
      
    }
  }

  handleLogin = (data) => {
    this.setState({
      user: data.user
    })
  }

  handleFormSwitch = (input) => {
    this.setState({
      form: input
    })
  }

  //not sure we need this
  handleAuthClick = () => {
    const token = localStorage.getItem("token")

    axios.get(`http://localhost:3001/user_is_authed`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(data => {
      console.log(data);
    })
  }

  handleLogout = () => {
    this.setState({
      user: {}
    })
    localStorage.setItem("token", '')
  }
  render () {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route 
              exact path= '/'
              render={props => (
                <Home {...props} />
              )} 
              />
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
             <Route 
              exact path='/logout' 
              render={props => (
                <LogOut {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route
              exact path='/meals'
              render={props => (
                <MealsIndex {...props} />
              )}
            />
            <Route
              exact path='/meals/new'
              render={props => (
                <MealsNew {...props} user={this.state.user}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
