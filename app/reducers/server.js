// @flow
import {
  ADD_SERVER,
  IS_HLS,
  IS_RTMP,
  CONN_START,
  CONN_END,
  CONN_ERR,
  CONN_CONNECTED
} from '../actions/server';

const defaultState = {};

export default function server(state = defaultState, action: Object) {
  switch (action.type) {
    case ADD_SERVER:
      return {
        ...state,
        url: action.url
      }
    case IS_HLS:
      return {
        ...state,
        hls: true,
        rtmp: false
      }
    case IS_RTMP:
      return {
        ...state,
        hls: false,
        rtmp: true
      }
    case CONN_START:
      return {
        ...state,
        connectionStarted: true,
        connectionConnected: false,
        connectionEnded: false,
        connectionError: false
      }
    case CONN_CONNECTED:
      return {
        ...state,
        connectionStarted: true,
        connectionConnected: true,
        connectionEnded: false,
        connectionError: false
      }
    case CONN_END:
      return {
        ...state,
        connectionStarted: false,
        connectionConnected: false,
        connectionEnded: true,
        connectionError: false
      }
    case CONN_ERR:
      return {
        ...state,
        connectionStarted: true,
        connectionConnected: false,
        connectionEnded: false,
        connectionError: true,
        reason: action.reason
      }
    default:
      return state;
  }
}
