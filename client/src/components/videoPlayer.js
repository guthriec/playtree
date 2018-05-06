import React, { Component } from 'react';
import videojs from 'video.js';
import 'videojs-contrib-dash';
import 'dashjs';

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
    this.player.src({
      src: this.props.srcUrl,
      type: this.props.srcType
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.srcUrl && this.player) {
      if (nextProps.srcUrl !== this.props.srcUrl) {
        this.player.src({
          src: nextProps.srcUrl,
          type: nextProps.srcType
        });
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
