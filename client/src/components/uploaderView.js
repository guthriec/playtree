import React, { Component } from 'react';

// import './uploader.css';

import ReactS3Uploader from 'react-s3-uploader';

export default class UploaderView extends Component {
  render() {
    return (
      <div>
        <ReactS3Uploader
          accept="video/mp4"
          signingUrl="/s3/sign"
          s3path=""
          signingUrlMethod="GET"
          signingUrlWithCredentials={true}
          uploadRequestHeaders={{
            'x-amz-acl': 'public-read'
          }}
        />
      </div>
    );
  }
}
