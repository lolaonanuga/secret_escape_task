import React from 'react'
import { Menu, Input, Form} from 'semantic-ui-react'

const Header = ({search, filterBy}) => {

    return (
        <Menu text>
            <Menu.Header>
           <span className="logo-title"><h1 id="logo">Y</h1></span> <span className="logo-title"><h1>Hacker News</h1></span>
          </Menu.Header>
  
           <Menu.Item position='right'>
              <Form><Input icon='search' placeholder='Search...'  onChange={(e) => {filterBy(e.target.value)}} /></Form>
            </Menu.Item>
        
  
        </Menu>
      )
    }
export default Header