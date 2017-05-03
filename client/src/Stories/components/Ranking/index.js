import React from 'react';
import Stories from './lib/stories';
import Events from '../Events';
import { ActionCable, Cable } from 'react-action-cable-fixed';
import Spinner from 'react-spinkit';

var actionCable = ActionCable.createConsumer('/cable');

var cable = new Cable({
  EventsChannel: actionCable.subscriptions.create({channel: 'EventsChannel'}, ['newStory'])
});

class StoriesRanking extends React.Component {

  state = {
    stories: [],
    loading: false
  };

  getStories = () => {
    Stories.get((stories) => {
      this.setState({
        stories: stories,
        loading: false,
      });
    });
  }

  refresh = () => {
    this.setState({
      loading:true
    })
    this.getStories()
  };

  componentDidMount() {
    this.setState({
      loading:true
    })
    this.getStories()
  }

  render() {
    const { stories } = this.state ? this.state : [];

    const storyRows = stories.map((story, idx) => (
      <tr key={idx}>
        <td>{story.title}</td>
        <td className='right aligned'>{story.points}</td>
        <td className='right aligned'>{story.comments}</td>
        <td className='right aligned'>{story.created_at}</td>
        <td className='right aligned'>{story.lifetime}</td>
      </tr>
    ));

    const spinner = <Spinner spinnerName="three-bounce" noFadeIn/>;

    return (
      <div id='stories-ranking'>
        <table className='ui selectable structured large table'>
          <thead>
            <tr>
              <th colSpan='5'>
                <div className="ui clearing">
                  <span>Newcomers Ranking</span>
                  <button className="ui right floated icon button" onClick={this.refresh}>
                    <i className='refresh icon'></i>
                  </button>
                  <Events cable={cable} refresh={this.refresh} loading={this.state.loading}/>
                </div>
              </th>
            </tr>
            <tr>
              <th className='eight wide'>Title</th>
              <th>Points</th>
              <th>Comments</th>
              <th>Created at</th>
              <th>Lifetime (hs)</th>
            </tr>
          </thead>
          <tbody>
            {this.state.loading &&
              <tr>
                <td colSpan='5' className='center aligned'>{ spinner }</td>
              </tr>
            }
            { storyRows }
          </tbody>
        </table>
      </div>

    );
  }
}

export default StoriesRanking;
