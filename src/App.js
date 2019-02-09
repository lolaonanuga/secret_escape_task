import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import StoryContainer from './components/StoryContainer'
import Nav from './components/Nav'
import Header from './components/Header'
class App extends Component {


  state = {
   
    stories: null,
    filter: "All",
    filteredStories: null,
    loading:true
  }

  filterBy = (term) => {
   
    this.setState({filter: null, loading:true}, () => {
  
      switch (term) {

      case 'All':
        this.setState({
        filter: 'All'})
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
      setTimeout(() => this.setState({loading:false }), 2000)
    })
  }

  subHeading = () => {
    switch (this.state.filter) {

      case 'All':
        return  "All stories"
      case 'Latest':
        return "Latest stories"
      case 'Ask HN':
        return "Ask HN"
      case 'Show HN':
        return "Show HN"
      default:
        return `Search results for: ${this.state.filter}`
    }
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
          .then(() =>  setTimeout(() =>  this.setState({loading:false }), 5000))
  }




  render() {
    const stories = (this.state.filter === 'All' ? this.state.stories : this.state.filteredStories )
    const {loading} = this.state
    const {filterBy, subHeading} = this
    return (
      <div className="app-container"> 
        <div className="nav">
          <Header filterBy={filterBy} />
          <Nav filterBy={filterBy}  />
        </div>
        <h2 className="sub-header">{subHeading()}</h2>
        {!loading?
          <StoryContainer className="story-container" stories={stories} /> 
        :
          <div className="load-container">
            <img className="loading" src="https://loading.io/spinners/dual-ring/lg.dual-ring-loader.gif" alt='loading' />
          </div>
        }
      </div>
    );
  }
}

export default App;
