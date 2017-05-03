import React, { Component } from 'react';
import StoriesRanking from './StoriesRanking';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='ui text container'>
          <StoriesRanking/>
        </div>
      </div>
    );
  }
}

export default App;
