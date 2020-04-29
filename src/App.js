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
      isLoggedIn: false,
      user: {}
    };
  }

  componentDidMount() {
    this.loginStatus();
  }
  loginStatus = () => {
    axios.get('http://localhost:3001/logged_in',
    {withCredentials: true})

    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }
  render () {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route 
              exact path= '/'
              render={props => (
                <Home {...props} loggedInStatus={this.state.isLoggedIn}/>
              )} 
              />
            <Route 
              exact path='/login' 
              render={props => (
                <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )} 
            />
            <Route 
              exact path='/signup' 
              render={props => (
                <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
             <Route 
              exact path='/logout' 
              render={props => (
                <LogOut {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route
              exact path='/meals'
              render={props => (
                <MealsIndex {...props} loggedInStatus={this.state.isLoggedIn} />
              )}
            />
            <Route
              exact path='/meals/new'
              render={props => (
                <MealsNew {...props} loggedInStatus={this.state.isLoggedIn} user={this.state.user}
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
