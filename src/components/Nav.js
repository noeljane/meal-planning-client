import React,  { Component } from 'react';
import { Menu } from 'antd';
class Nav extends Component {
render ()  {
  return (
    <Menu  mode="horizontal">
      <Menu.Item>Login/Logout</Menu.Item>
      <Menu.Item>Add Meals</Menu.Item>
      <Menu.Item>Meal Calendar</Menu.Item>
    </Menu>
  )
}
}
export default Nav;