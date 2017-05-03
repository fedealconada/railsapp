import React, { Component } from 'react';
import StoriesRanking from './Stories/components/Ranking';

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
