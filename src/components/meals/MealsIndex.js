import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


class MealsIndex extends Component {
  // constructor(props) {
  //   this.state = {
  //     meals: []
  //   }
  // }

  //TODO: 
    //pass through propsl 

  render() {
    return (
      <div>
        <h1>Meals!!</h1>
        <Link  to='/meals/new'>Create a Meal</Link>
      </div>
      
    )
  }


}

export default MealsIndex;