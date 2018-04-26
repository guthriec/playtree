import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';

import GoX from 'react-icons/lib/go/x';
import IoShare from 'react-icons/lib/io/share';
import MdPlay from 'react-icons/lib/md/play-circle-outline';

import './videoEntry.css';

export default class VideoEntryView extends Component {
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
    if (this.props.videoIsHidden) {
      return (
        <div className="hidden-entry">
          <p>Ok! {video.title} has been hidden.</p>
          <button
            onClick={() => {
              this.props.showVideo(video.shortId, this.props.feedKey);
            }}
          >
            Undo
          </button>
        </div>
      );
    }
    const uploadDate = new Date(Date.parse(video.uploadDate));
    var uploadDateString = "";
    try {
      uploadDateString = uploadDate.toLocaleDateString();
    } catch (err) {}
    const modalState = this.props.modalState;
    const authorModalOpen = modalState.isOpen && modalState.type === "author";
    const shareModalOpen = modalState.isOpen && modalState.type === "share";
    const descModalOpen = modalState.isOpen && modalState.type === "desc";
    const linkDestination = this.props.linkDestination;
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
            Uploaded by {video.uploader} on {uploadDateString}
          </p>
        </ReactModal>
        {/* share modal */}
        <ReactModal
          isOpen={shareModalOpen}
          onRequestClose={this.props.closeModal}
          onAfterOpen={() => {
            this.refs.shareLink.select();
          }}
          className="share-modal"
          overlayClassName="modal-overlay"
        >
          <button onClick={this.props.closeModal}>Close</button>
          <h3>Share {video.title}:</h3>
          <input
            className="share-field"
            ref="shareLink"
            type="text"
            value={this.props.shareLink}
            onChange={this.props.handleShareLinkChange}
          />
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
          <button
            className="share-button"
            onClick={() => this.props.openModal('share')}
          >
            <IoShare size={20} />
            <p>Share</p>
          </button>
          <button
            className="dismiss-button"
            onClick={() =>
              this.props.hideVideo(this.props.video.shortId,
                                   this.props.feedKey)}
          >
            <GoX size={20} />
            <p>Not now</p>
          </button>
        </div>
        <div className="video-container">
          <div className="video-top">
            <div className="video-go">
              <Link className="video-link" to={linkDestination}>
                <div className="poster-overlay">
                </div>
                <img className="poster" alt={video.title}
                     src={video.thumbnailUrl} />
                <div className="play-icon">
                  <MdPlay size={92} />
                </div>
              </Link>
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
              <Link className="title-link" to={linkDestination}>
                <p>{video.title}</p>
              </Link>
            </div>
            <div className="bottom-right">
              <button
                className="author"
                onClick={() => this.props.openModal('author')}
              >
                By: {video.author}
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
