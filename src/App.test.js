import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StoryContainer from './components/StoryContainer';
import Story from './components/Story';
import Header from './components/Header'
import Nav from './components/Nav';
import {render, fireEvent} from "react-testing-library"
// import "dom-testing-library/extend-expect"

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });


describe('NewsFeed', () => {
  let ids = [ 19120622,19120633,19120644]
  let stories = [
      {
        by: "nabla9",
        id: 19120622,
        score: 43,
        time: 1549685069,
        title: "We need to talk about systematic fraud"},
      {
        by: "nabl55",
        id: 19120633,
        score: 22,
        time: 1549685069,
        title: "Life of Pi"
      },
      {
        by: "nabla91",
        id: 19120644,
        score: 400,
        time: 1549685069,
        title: "Facebook scandal"
      }
    ]

      const createProps = props => ({ 
         stories: stories,
         addScore: jest.fn(),
         filterBy: jest.fn(),
         handleItemClick: jest.fn(),
        ...props 
      })




  it('renders each story', () => {
    let props = createProps()
    const { container } = render(<StoryContainer {...props} />)
    const storyNodes = container.querySelectorAll('#card')
    expect(storyNodes.length).toBe(props.stories.length)
  })


  it('filters news stories on search input', () => {
   
    const searchTerm = "fraud"
    let props = createProps()
    const { container } = render(<Header {...props} />)
    
    const searchNode = container.querySelector('.ui.form input')
    
    fireEvent.change(searchNode, {
      target: { value: searchTerm }
    })
    expect(props.filterBy).toHaveBeenCalledTimes(1)
    expect(props.filterBy).toHaveBeenCalledWith(searchTerm)
  }) 
 
  
  it('filters news stories with site link options', () => {
   
    
    let props = createProps()
    const { container } = render(<Nav {...props} />)
    const storyNodes = container.querySelectorAll('#card')
    const latest = container.querySelector('#latest')
    fireEvent.click(latest)
 
    expect(props.filterBy).toHaveBeenCalledTimes(1)
    expect(props.filterBy).toHaveBeenCalledWith("Latest")
  }) 
  
 
  it('allows the user to like a comment (only once)', () => {
    let props = createProps()
    let id = props.stories[1].title
    const { getByTestId } = render(<StoryContainer {...props} />)
    const likeNode = getByTestId(id)
    const scoreNode = likeNode.nextSibling 
    fireEvent.click(likeNode)
    expect(Number(scoreNode.innerHTML) ).toEqual(props.stories[1].score + 1)
    fireEvent.click(likeNode)
    expect(Number(scoreNode.innerHTML) ).toEqual(props.stories[1].score + 1)
  }) 



  it('will resize a story on click', () => {
    let props = createProps()
    let id = props.stories[1].title
    const { getByText } = render(<StoryContainer {...props} />)
    const story = getByText(id).nextSibling.nextSibling

    fireEvent.click(story)
    expect(getByText(id).parentNode.parentNode.style.width).toEqual('40rem')

    fireEvent.click(story)
    expect(getByText(id).parentNode.parentNode.style.width).toEqual('20rem')

  }) 

})