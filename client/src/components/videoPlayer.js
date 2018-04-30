import React, { Component } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import './play.css';

export default class VideoPlayer extends Component {
  componentDidMount() {
    const onActive = this.props.onActive;
    const onInactive = this.props.onInactive;
    this.player = videojs(this.videoNode, this.props.options,
                          function onPlayerReady() {
                            this.on("useractive", onActive);
                            this.on("userinactive", onInactive);
    });
    this.player.src(this.props.src);
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src && this.player) {
      if (nextProps.src !== this.props.src) {
        this.player.src(nextProps.src);
      }
    }
    //problem on poster update?
  }

  render() {
    return (
      <div>
        <div data-vjs-player>
          <video
            ref={ node => this.videoNode = node }
            className="video-js vjs-default-skin vjs-16-9 vjs-short"
          >
          </video>
        </div>
      </div>
    )
  }
}
