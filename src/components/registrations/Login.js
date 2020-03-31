import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render () {
    const {username, email,password} = this.state;
    return (
      <div>
        <h1>Log In</h1>

        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={this.handleChange}/>
            <button placeholder="submit" type="submit">
              Log In
            </button>

            <div>
              or <Link to='/signup'></Link>
            </div>

        </form>
      </div>

    )
  }
}

export default Login;