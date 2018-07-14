import React, { Component } from 'react';

export default class FeedHeader extends Component {
  render() {
    return (
      <div className="feed-header">
        <p>
          your source for
          <b className="header-bold"> {this.props.adjective} </b>
          videos
        </p>
      </div>
    );
  }
}
