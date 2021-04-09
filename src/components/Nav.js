import React,  { Component } from 'react';
import { Menu } from 'antd';


class Nav extends Component {
render ()  {
  return (
    <Menu  mode="horizontal">
      <Menu.Item><a href="/login">Login</a></Menu.Item>
      <Menu.Item><a href="/meals/new">Add Meals</a></Menu.Item>
      <Menu.Item><a href="/meals/">Meal Calendar</a></Menu.Item>
    </Menu>
  )
}
}
export default Nav;