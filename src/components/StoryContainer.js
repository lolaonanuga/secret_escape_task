import React from 'react'
import { Grid } from 'semantic-ui-react'
import Story from './Story'


const StoryContainer = ({stories}) => (

   <div className="ui six doubling cards">
  {stories.map(story => 
    story ? <Story story={story} /> : <div className="ui card">Story unavailable</div> 
    )}
 </div>
)

export default StoryContainer