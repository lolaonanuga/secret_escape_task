import React, { Component } from 'react'
import { Menu, Input} from 'semantic-ui-react'

 class Nav extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name },this.props.sort(name))
    
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu text>
       
        <Menu.Item header>Sort By</Menu.Item>
        <Menu.Item
          name='Author (a-z)'
          active={activeItem === 'Author (a-z)'}
          onClick={this.handleItemClick}
        />
         <Menu.Item
          name='Latest'
          active={activeItem === 'Latest'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Highest Rated'
          active={activeItem === 'Highest Rated'}
          onClick={this.handleItemClick}
        />
       
      

      </Menu>
    )
  }
}
export default Nav