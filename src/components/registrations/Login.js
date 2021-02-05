import React, { Component } from 'react';
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
    const { username, email, password } = this.state;

    fetch(`http://localhost:3001/login`, {
      method: "POST", 
      headers: {
        "Content-Type" : "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
    .then(resp => resp.json())
    .then(data => {
      localStorage.setItem("token", data.token)
      this.props.handleLogin(data.user)
    })
    .catch(error => {
      console.log(error)
    }) 
  }

  redirect = () => {
    this.props.history.push('/meals')
  }

  handleErrors = () => {
    return(
      <div>
        <ul>
          {this.state.errors.map(error => {
            return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
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
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}/>
            <button placeholder="submit" type="submit">
              Log In
            </button>

            <div>
              or <Link to='/signup'></Link>
            </div>

        </form>
        <div>
          {
            this.state.errors ? this.handleErrors(): null
          }
        </div>
      </div>

    )
  }
}

export default Login;