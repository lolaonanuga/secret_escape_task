import React from 'react'
import Story from './Story'


const StoryContainer = ({stories}) => (

    <div className="ui six doubling cards">
        {stories.map(( story, i) => 
            story ?
                <Story story={story} key={i} /> 
            : 
                <div className="ui card">Story unavailable</div> 
            )}
    </div>
)

export default StoryContainer