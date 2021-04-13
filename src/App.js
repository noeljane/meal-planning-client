import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Nav from  './components/Nav';
import Login from './components/registrations/Login';
import Signup from './components/registrations/Signup';
import LogOut from './components/registrations/Logout'
import MealsIndex from './components/meals/MealsIndex';
import MealsNew from './components/meals/MealsNew';
import MealsShow from './components/meals/MealsShow';
import 'antd/dist/antd.css';
import './index.css';

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
    if(token !== undefined) {
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

  handleLogout = () => {
    this.setState({
      user: {}
    })
    localStorage.setItem("token", '')
  }
  render () {
    return (
      <div>
        <Nav user={this.state.user}/>
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
            <Route
              path='/meals/:id'
              render={(props)=> {
                return <MealsShow user={this.state.user} mealId={props.match.params.id}/>
              }}
              
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
