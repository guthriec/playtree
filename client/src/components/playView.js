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
      preload: "auto",
      poster: this.props.video.thumbnailUrl
    }
    var player = (
      <div className="video-container">
        <VideoPlayer
          srcUrl={this.props.video.url}
          srcType="application/dash+xml"
          options={options}
          onActive={this.props.onActive}
          onInactive={this.props.onInactive}
        />
      </div>
    );
    if (this.props.video.sourceName === "Vimeo") {
      const srcString = "https://player.vimeo.com/video/" +
                        this.props.video.sourceId +
                        "?autoplay=1&title=0&byline=0&portrait=0" 

      player = (
        <div className="vimeo-player-container">
          <iframe
            src={srcString} 
            className="vimeo-player"
            frameBorder="0"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            allowFullScreen
          />
        </div>
      )
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
        {player}
      </div>
    );
  }
}
