import React, { Component } from 'react';
import ReactModal from 'react-modal';

import './videoEntry.css';

export default class VideoEntryPreview extends Component {
  componentDidMount() {
    this.props.testDescOverflow(this.refs.desc);
    window.addEventListener("resize", () => {
                              if (this.refs.desc) {
                                this.props.testDescOverflow(this.refs.desc);
                              }
                            });
  }

  render() {
    const video = this.props.video;
    const uploadDate = new Date(Date.parse(video.uploadDate));
    var uploadDateString = "";
    try {
      uploadDateString = uploadDate.toLocaleDateString();
    } catch (err) {}
    const modalState = this.props.modalState;
    const authorModalOpen = modalState.isOpen && modalState.type === "author";
    const descModalOpen = modalState.isOpen && modalState.type === "desc";
    var moreButton = "";
    if (this.props.doesDescOverflow) {
      moreButton = (
        <button
          className="more-button"
          onClick={() => this.props.openModal('desc')}
        >
          read more
        </button>
      );
    }

    return (
      <div className="video-entry">
        {/* author modal */}
        <ReactModal
          isOpen={authorModalOpen}
          onRequestClose={this.props.closeModal}
          className="author-modal"
          overlayClassName="modal-overlay"
        >
          <button onClick={this.props.closeModal}>Close</button>
          <a href={video.authorUrl} target="_blank">
            <h4>{video.author}</h4>
          </a>
          <h4>Originally shared on:
            <br></br>
            <a href={video.sourceUrl} target="_blank">{video.sourceUrl}</a>
          </h4>
          <p>
            Added to Playtree on {uploadDateString}
          </p>
        </ReactModal>
        {/* dexcription modal */}
        <ReactModal
          isOpen={descModalOpen}
          onRequestClose={this.props.closeModal}
          className="desc-modal"
          overlayClassName="modal-overlay"
        >
          <button onClick={this.props.closeModal}>Close</button>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
        </ReactModal>
        <div className="entry-controls">
        </div>
        <div className="video-container">
          <div className="video-top">
            <div className="video-go">
              <div className="video-link">
                <div className="poster-overlay">
                </div>
                <img className="poster" alt={video.title}
                     src={video.thumbnailUrl} />
                <div className="play-icon">
                </div>
              </div>
            </div>
            <div className="video-desc">
              <div className="desc-text" ref="desc">
                <p>
                  {video.description}
                </p>
              </div>
              {moreButton}
            </div>
          </div>
          <div className="video-bottom">
            <div className="bottom-left">
              <button className="title-link">
                <p>{video.title}</p>
              </button>
            </div>
            <div className="bottom-right">
              <button
                className="author"
                onClick={() => this.props.openModal('author')}
              >
                By: {video.author} on {video.sourceName}
              </button>
              <a
                className="license"
                href={video.licenseUrl}
                target="_blank"
              >
                License: {video.licenseType}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
