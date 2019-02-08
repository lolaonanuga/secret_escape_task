import React, { Component } from 'react'
import { Menu, Input} from 'semantic-ui-react'

 class Nav extends Component {
   
  state = { activeItem: 'All' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name },this.props.filterBy(name))
    
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu text>
       
        <Menu.Item header>View:</Menu.Item>
      

        <Menu.Item
        name='All'
        active={activeItem === 'All stories'}
        onClick={this.handleItemClick}
        />
          <Menu.Item
          name='Latest'
          active={activeItem === 'Latest'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Show HN'
          active={activeItem === 'Show HN'}
          onClick={this.handleItemClick}
        />
         <Menu.Item
          name='Ask HN'
          active={activeItem === 'Ask HN'}
          onClick={this.handleItemClick}
        />

        


      </Menu>
    )
  }
}
export default Nav