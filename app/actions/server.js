// @flow
export const ADD_SERVER = 'ADD_SERVER';
export const CONN_START = 'CONN_START';
export const CONN_CONNECTED = 'CONN_CONNECTED';
export const CONN_END = 'CONN_END';
export const CONN_ERR = 'CONN_ERR';
export const IS_HLS = 'IS_HLS';
export const IS_RTMP = 'IS_RTMP';

export function addServer(url) {
  return {
    type: ADD_SERVER,
    url: url
  };
}

export function isHLS() {
  return {
    type: IS_HLS,
    hls: true,
    rtmp: false
  }
}

export function isRTMP() {
  return {
    type: IS_RTMP,
    rtmp: true,
    hls: false
  }
}

export function connectionStart() {
  return {
    type: CONN_START
  };
}

export function connectionConnected() {
  return {
    type: CONN_CONNECTED
  };
}

export function connectionEnd() {
  return {
    type: CONN_END
  };
}

export function connectionError() {
  return {
    type: CONN_ERR
  };
}
