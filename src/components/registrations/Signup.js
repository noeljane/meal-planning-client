import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '', 
      password: '',
      password_confirmation: '', 
      errors: ''
    };
  }

  handleChange = (event) => {
    const { name, value} = event.target;
    this.setState({
      [name]: value
    })
  }


  handleSubmit = (evt) => {
    evt.preventDefault()
      const {username, email, password, password_confirmation} = this.state;
    fetch(`http://localhost:3001/users`,  {
      method: "POST",
      headers:  {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      mode:'no-cors',
      body: JSON.stringify({
        username,
        email,
        password
      })

    })
    .then(resp  => resp.json())
    .then(data => {
      localStorage.setItem("token", data.jwt)
      this.props.handleLogin(data.user)
    })
    .catch(err => console.log(err))

  }

  redirect = () => {
    this.props.history.push('/')
  }

  handleErrors = () => {
    return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <li key={error}>{error}</li>
        })}</ul>
      </div>
    )
  }

  render () {
    const { username, email, password, password_confirmation } = this.state;
    return (
      <div>
        <h1>Sign Up</h1>

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
          >
          </input>
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />

          <input
            placeholder="password confirmation"
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={this.handleChange}
          />
          <button placeholder="submit" type="submit">
            Sign Up
          </button>
        </form>
        <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
      </div>

    )
  }
}

export default Signup;