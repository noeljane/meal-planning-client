import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class MealsIndex extends Component {
  // constructor(props) {
  //   this.state = {
  //     meals: []
  //   }
  // }

  render() {
    return (
      <h1>Meals!!</h1>
      <a href='/meals/new'></a>
    )
  }


}

export default MealsIndex;