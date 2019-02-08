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
    sort: '',
    searchTerm: '',
    filteredStories:[]
  }

  search = (e) => this.setState({searchTerm: e.target.value, filteredStories:this.searchResults(e.target.value)})


  searchResults = (term) => 
    this.state.stories.filter(story => story.title.includes(term))
 

  sort = (sortType) => { console.log(sortType)
    this.setState({sort: sortType, stories:this.sortResults(sortType)}) }

  sortResults = (sortType) => {
    let sort 
   
    if (sortType === 'Highest Rated') {
      sort = this.state.stories.sort( (a, b) => {
        return a.score - b.score
      })
    }
    else if (sortType === 'Author (a-z)') {
      sort =  this.state.stories.sort( (a, b) => {
        let nameA = a.by.toUpperCase()
        let nameB = b.by.toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
  
        return 0
      })
    }
   return sort

  }

  componentDidMount() {
    axios.get(`https://hacker-news.firebaseio.com/v0/topstories.json/`)
      .then(res => {
        const storyIDs = res.data;
        this.setState({ storyIDs: storyIDs }, 
          storyIDs.forEach(id => 
            axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(res => this.setState({stories: [...this.state.stories,res.data]}))
          ));
      })
  }




  render() {
    const stories = (this.state.search !== '' ? this.state.stories : this.searchResults(this.state.searchTerm) )
    const {storyIDs} = this.state
    const {search,sort} = this
    return (
      <div className="app-container"> 
      <div className="nav">
        <Header search={search} />
        <Nav sort={sort} />
        </div>
        {storyIDs ?
        <StoryContainer className="story-container" stories={stories} />
       :
       <p>Loading</p>}
      </div>
    );
  }
}

export default App;
