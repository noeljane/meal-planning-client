import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class MealsNew extends Component {
  //TODO: Add axios for creating new meal
  handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitted!')
  }
  render() {
    return (
      <div>
        <h1>Add a meal, fool!</h1>
        <form>

        </form>
      </div>
    )
  }
}

export default MealsNew;