import { CableMixin, ChannelMixin } from 'react-action-cable-fixed';
import React from 'react';

module.exports = React.createClass({
  mixins: [CableMixin(React), ChannelMixin('EventsChannel')],

  getInitialState() {
    return {
      message: []
    }
  },

  handleConnected() {
    // console.log('Connected!')
  },

  handleDisconnected() {
    // console.log('Disconnected!')
  },

  handleNewStory(data) {
    console.log('New story: ' + JSON.stringify(data));
    this.setState((state) => { message: state.message.push(data) });
    this.props.refresh();
    this.timer = setTimeout(_ => {
      this.setState({message: []});
    }, 5000);
  },

  render() {
    return (
      <div>
      { this.state.message.length > 0 && this.state.message[this.state.message.length -1].event_broadcasted &&
        <div>
          <a className="item">
            <div className="ui red horizontal label">New changes!</div>
          </a>
        </div>
      }
      </div>
    )
  }
});
