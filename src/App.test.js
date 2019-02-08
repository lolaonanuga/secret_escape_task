import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {render} from "react-testing-library"
import "dom-testing-library/extend-expect"

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

test("Storycontainer receives story ids and maps them", () => {
  const {getByTestId} = render(
    < StoryContainer stories={[111,222,333,444,555]} />
  )
  expect(getByTestId("story")).toBeInTheDom()
})