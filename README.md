# Hacker News

A redesign of Y Combinator's Hacker News site, using their API

## Technologies used
[React](https://reactjs.org)
[Semantic UI](https://semantic-ui.com)


## Installing

```
npm install && npm start
```

Visit (http://localhost:3000) to view it in the browser.


## Testing 

```
npm test 
```

## Built With

[React](https://reactjs.org)
[Express](https://expressjs.com)
[React-Testing-Library](https://github.com/kentcdodds/react-testing-library)


## Building the app
Code structure and clarity of the code
● Decisions made to enhance the user experience
● Examples of test driven development (100% coverage not required)
● HTML/CSS skills
● JS skills

## Building the site

The original Hacker News website displays stories as a very basic old school list. It is quite tricky to figure out if the stories have been sorted by score or date. Despite the really interesting news stories, is pretty boring to look at, and hasn't been optimized for mobile devices. 

I set myself the following goals for this task

- Ensure the final product is in line with the wireframes I received, complete with the click to expand interactivity

- A visually appealing and easy to navigate single page site

- Maintain original brand colors

- Given the large number of stories, provide easy ways to filter them (using the links or the user's own search)

- Users can 'like' a story. As the main focus of this task is on the frontend, the likes do not persist and will be lost on refresh, however they will only be able to like a story once at a time.

- Ensure all functionalities have been tested

To fulfil the goals above, I chose to use Reactjs, as it makes it very easy to dynamically change a page content without constant refreshes. I used SemanticUI for a clean, familiar interface and full responsiveness. For testing I used React Testing Library and it's very clear, lightweight and easy to use.

### Testing

I have written a few tests to ensure the following

- All news stories are rendered

- Stories can be filtered by search input

- Stories can be filtered by site link options

- A user can like a story once

- A news story will expand on click
