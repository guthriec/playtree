import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import VideoPlayer from './videoPlayer';
import './play.css';
import GoArrowLeft from 'react-icons/lib/go/arrow-left';

export default class PlayView extends Component {
  render() {
    const options = {
      autoplay: true,
      controls: true,
      inactivityTimeout: 5000,
      poster: this.props.video.thumbnailUrl
    }
    var returnDestination = this.props.feedLocation;
    var returnLinkText = this.props.feedName;
    return (
      <div className="play">
        <div className={this.props.headerClass}>
          <Link
            className="back-button"
            to={returnDestination}
          >
            <GoArrowLeft size={30} className="back-arrow"/>
            <p className="back-text">Return to {returnLinkText}</p>
          </Link>
          <h4
            className="play-title"
          >
            {this.props.video.title}
          </h4>
          <div></div>
        </div>
        <div className="video-container">
          <VideoPlayer
            src={this.props.video.url}
            options={options}
            onActive={this.props.onActive}
            onInactive={this.props.onInactive}
          />
        </div>
      </div>
    );
  }
}
