import React, { Component } from 'react';

import FeedHeader from './feedHeader';

import './feed.css';

export default class FeedView extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    console.log(this.state.width);
    if (this.state.width > 767 || this.props.wideFeed) {
      return (
        <div className={(this.props.wideFeed) ? "wide-feed" : "feed"}>
          <FeedHeader
            adjective = {this.props.feedAdjective}
            wideFeed={this.props.wideFeed}
          />
          <div className="entry-list">
            { this.props.entryList }
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div
            className={"blur-overlay"}
            onClick={() => {
              this.props.collapseSidebar();
            }
          }>
          </div>
          <div className={"feed blurred"}>
            <FeedHeader
              adjective = {this.props.feedAdjective}
              wideFeed={this.props.wideFeed}
            />
            <div className="entry-list">
              { this.props.entryList }
            </div>
          </div>
        </div>
      );
    }
  }
}
