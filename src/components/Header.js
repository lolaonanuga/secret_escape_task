import React from 'react'
import { Menu, Input} from 'semantic-ui-react'

const Header = ({search}) => {

    return (
        <Menu text>
            <Menu.Header>
            <h1>Hacker News</h1>
          </Menu.Header>
  
           <Menu.Item position='right'>
              <Input icon='search' placeholder='Search...'  onChange={(e) => search(e)} />
            </Menu.Item>
        
  
        </Menu>
      )
    }
export default Header