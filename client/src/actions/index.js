import fetch from 'cross-fetch';

export * from './authActions';

export const CACHE_VIDEO_INFO = 'CACHE_VIDEO_INFO';
export const LOAD_VIDEO = 'LOAD_VIDEO';
export const RECEIVE_VIDEO = 'RECEIVE_VIDEO';
export const REQUEST_VIDEO = 'REQUEST_VIDEO';
export const CLEAR_ACTIVE_VIDEO = 'CLEAR_ACTIVE_VIDEO';

export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const REQUEST_CHANNEL = 'REQUEST_CHANNEL';

export const RECEIVE_FEED = 'RECEIVE_FEED';
export const REQUEST_FEED = 'REQUEST_FEED';
export const HIDE_VIDEO = 'HIDE_VIDEO';
export const SHOW_VIDEO = 'SHOW_VIDEO';

function feedListToIdMap(feedList) {
  var idObj = {};
  for (var i = 0; i< feedList.length; i++) {
    var currVid = feedList[i].video;
    currVid.isHidden = false;
    currVid.score = feedList[i].score;
    idObj[currVid.shortId] = currVid;
  }
  return idObj;
}

export function receiveFeed(feedKey, adjective, name, location, videos) {
  return {
    type: RECEIVE_FEED,
    feedKey: feedKey,
    adjective: adjective,
    name: name,
    location: location,
    videos: feedListToIdMap(videos)
  }
}

export function requestFeed(feedKey) {
  return {
    type: REQUEST_FEED,
    feed: feedKey
  }
}

export function fetchFeed(feedKey, adjective, name, location) {
  return function(dispatch) {
    dispatch(requestFeed(feedKey));
    return fetch('/api/feed/' + feedKey)
      .then(
        response => {
          return response.json();
        }
      )
      .then(
        json => {
          var videos = json.videos;
          dispatch(receiveFeed(feedKey, adjective, name, location, videos));
          var videosById = {};
          for (var i in videos) {
            var video = videos[i].video;
            videosById[video.shortId] = video;
          }
          dispatch(cacheVideoInfo(videosById));
        }
      )
  }
}

export function cacheVideoInfo(videosById) {
  return {
    type: CACHE_VIDEO_INFO,
    videosById: videosById
  }
}

export function loadVideo(video) {
  return {
    type: LOAD_VIDEO,
    video: video
  }
}

export function clearActiveVideo() {
  return {
    type: CLEAR_ACTIVE_VIDEO
  }
}

export function requestVideoLoad(videoId) {
  return function(dispatch, getState) {
    var cachedVideo = getState().videos.videos[videoId];
    if (cachedVideo) {
      dispatch(loadVideo(cachedVideo));
    } else {
      dispatch(fetchAndLoadVideo(videoId));
    }
  }
}

function requestVideoApi(videoId) {
  return {
    type: REQUEST_VIDEO,
    videoId: videoId
  }
}

function receiveVideoApi(video) {
  return {
    type: RECEIVE_VIDEO,
    video: video
  }
}

function fetchAndLoadVideo(videoId) {
  return function(dispatch) {
    dispatch(requestVideoApi(videoId));
    return fetch('/api/video/' + videoId)
      .then(
        response => {
          return response.json();
        }
      )
      .then(
        json => {
          dispatch(receiveVideoApi(json));
          dispatch(loadVideo(json));
          var videoById = {};
          videoById[json.shortId] = json;
          dispatch(cacheVideoInfo(videoById));
        }
      )
  }
}

export function fetchHomeVideos() {
  console.log('here');
  return function(dispatch) {
    dispatch(fetchFeed('home', "adventure", "Home", ""));
  }
}

export function requestChannel(channel) {
  return {
    type: REQUEST_CHANNEL,
    channel: channel
  }
}

export function receiveChannel(channel, json) {
  return {
    type: RECEIVE_CHANNEL,
    channel: channel,
    info: json.info
  }
}

export function fetchChannel(channel) {
  return function(dispatch) {
    dispatch(requestChannel(channel));
    return fetch('/api/channel/' + channel)
      .then(
        response => {
          return response.json();
        }
      )
      .then(
        json => {
          var info = json.info;
          dispatch(fetchFeed(channel, info.adjective, info.topic + " channel",
                             "/channel/" + info.urlSegment));
          dispatch(receiveChannel(channel, json));
        }
      )
  }
}

export function hideVideo(videoId, feedKey) {
  fetch('/api/feedback', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      event: 'hideVideo',
      videoId: videoId,
      feed: feedKey
    })
  })
  return {
    type: HIDE_VIDEO,
    videoId: videoId,
    feedKey: feedKey
  }
}

export function showVideo(videoId, feedKey) {
  return {
    type: SHOW_VIDEO,
    videoId: videoId,
    feedKey: feedKey
  }
}