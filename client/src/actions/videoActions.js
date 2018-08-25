import fetch from 'cross-fetch';

export const IMPORT_VIMEO_VIDEO = 'IMPORT_VIMEO_VIDEO';
export const RECEIVE_IMPORTED_VIDEO = 'RECEIVE_IMPORTED_VIDEO';
export const REQUEST_IMPORT = 'REQUEST_IMPORT';
export const REQUEST_ADD_CHANNEL = 'REQUEST_ADD_CHANNEL';

export function setAsWatched(video) {
  console.log(video);
  return function() {
    return fetch('/api/watched',
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          servedId: video.servedId
        })
      }
    );
  }
}

export function suggestChannel(videoId, channel) {
  return function(dispatch) {
    dispatch(requestAddChannel());
    return fetch('/api/suggest-channel',
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          videoId: videoId,
          channelTopic: channel.topic,
          channelUrl: channel.urlSegment
        })
      }
    );
  }
}

export function requestAddChannel() {
  return {
    type: REQUEST_ADD_CHANNEL
  }
}

export function requestImport() {
  return {
    type: REQUEST_IMPORT
  }
}

export function receiveImportedVideo(video) {
  return {
    type: RECEIVE_IMPORTED_VIDEO,
    video: video
  }
}

export function importVimeoVideo(vimeoUrl) {
  return function(dispatch) {
    dispatch(requestImport());
    return fetch('/api/import',
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vimeoUrl: vimeoUrl
        })
      })
      .then(
        response => {
          return response.json();
        }
      )
      .then(
        json => {
          var video = json.video;
          dispatch(receiveImportedVideo(video));
        }
      )
  }
}
