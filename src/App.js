import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import StoryContainer from './components/StoryContainer'
import Nav from './components/Nav'
import Header from './components/Header'
class App extends Component {


  state = {
    storyIDs: null,
    stories: null,
    filter: "All",
    searchTerm: '',
    filteredStories: null,
    loading:true
  }

  filterBy = (term) => {
   
    this.setState({filter: null, loading:true},  () => {
  
   
    switch (term) {

    case 'All':
    break;

    case 'Latest':
    this.setState({
      filter: 'Latest',
      filteredStories: this.sortbyTime()
    })
    break;

    case 'Ask HN':
   
    this.setState({
      filter: term,
      filteredStories: this.searchResults('Ask HN')
    })
    break;
    
    case 'Show HN':
    this.setState({
      filter: 'Show HN',
      filteredStories: this.searchResults('Show HN')
    })
    break;

    default:
    this.setState({
      filter: term, 
      filteredStories: this.searchResults(term)
      })
    }
    setTimeout(() =>  this.setState({loading:false }), 2000)
  })
  
  }



  

  searchResults = (term) => this.state.stories.filter(story => story.title.includes(term))
  
 

  sortbyTime = () => {
    const sortedByTime =  this.state.stories.sort( (a, b) => {
      return b.time - a.time
    })
    return sortedByTime.slice(0,50)
  }
  

  componentDidMount() {
   let storyArray = []
    let storyIDs = []

    axios.get(`https://hacker-news.firebaseio.com/v0/topstories.json/`)
      .then(res => {
        storyIDs = [...res.data]
     
      })
      .then(() =>
       
          storyIDs.forEach(id => {
            
            axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(res =>  storyArray.push(res.data))    
          }))
          .then(() => this.setState({stories: storyArray }) )
          .then(() =>  setTimeout(() =>  this.setState({loading:false }), 5000)  )
  }




  render() {
    const stories = (this.state.filter === 'All' ? this.state.stories : this.state.filteredStories )
   
    const {storyIDs, filter, loading} = this.state
    const {filterBy} = this
    return (
      <div className="app-container"> 
      <div className="nav">
        <Header filterBy={filterBy} />
        <Nav filterBy={filterBy}  />
        </div>
        <h2 className="label">{ filter ? 'Filter: ' + '"' + filter + '"' : 'All Stories'}</h2>
        {!loading?
        <StoryContainer className="story-container" stories={stories} /> 
       :
       <div className="load-container">
          <img className="loading" src="https://loading.io/spinners/dual-ring/lg.dual-ring-loader.gif" />
       </div>}
       {console.log(stories)}
    
      </div>
    );
  }
}

export default App;
