import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import StoryContainer from './components/StoryContainer'
import Nav from './components/Nav'
import Header from './components/Header'
class App extends Component {


  state = {
    storyIDs: null,
    stories: [],
    filter: null,
    searchTerm: '',
    filteredStories: []
  }

  filterBy = (term) => {
   
    this.setState({filter: null},  () => {
  
   
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
      filteredStories: this.searchResults(term)})
    }
  })
  
  }



  

  searchResults = (term) => this.state.stories.filter(story => story.title.includes(term))
  
 

  sortbyTime = () => {
    const sortedByTime =  this.state.stories.sort( (a, b) => {
      return b.time - a.time
    })
    return sortedByTime.slice(0,50)
  }

  sort = (sortType) => { console.log(sortType)
    this.setState({sort: sortType, stories:this.sortResults(sortType)}) }

  

  componentDidMount() {
    axios.get(`https://hacker-news.firebaseio.com/v0/topstories.json/`)
      .then(res => {
        const storyIDs = res.data;
        this.setState({ storyIDs: storyIDs }, 
          storyIDs.forEach(id => 
            axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(res => this.setState({stories: [...this.state.stories,res.data] }))
          ));
      })
  }




  render() {
    const stories = (!this.state.filter ? this.state.stories : this.state.filteredStories )
    if (this.state.filter) {console.log(stories)}
    const {storyIDs, filter} = this.state
    const {filterBy, sortBy} = this
    return (
      <div className="app-container"> 
      <div className="nav">
        <Header filterBy={filterBy} />
        <Nav filterBy={filterBy} sort={sortBy} />
        </div>
        <h2 className="label">{ filter ? 'Filter: ' + '"' + filter + '"' : 'All Stories'}</h2>
        {storyIDs ?
        <StoryContainer className="story-container" stories={stories} />
       :
       <p className="loading">Loading</p>}
      </div>
    );
  }
}

export default App;
