import React, { Component } from 'react';
import axios from 'axios';

class LogOut extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      

    }
  }

  logOut = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
      .then(response => {
        console.log("success, dude.")
      })
      .catch(error => console.log('api errors:', error))
  }

  render () {
    console.log(this.props);
    const { user}  = this.props;
    return(
      <div> 
        <h1>You want to log out?</h1>
        <button onClick={this.logOut}>Hell yes!</button>
      </div>
    )

  }
}

export default LogOut;