// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import styles from './Home.css';
import * as ServerActions from '../actions/server';

class HLS extends Component {

  loadHLSUrl() {
    var hls = new Hls();
    var vid = this.refs.vid;
    var url = this.props.server.url;

    hls.loadSource(url);
    hls.attachMedia(vid);

    hls.on(Hls.Events.MANIFEST_PARSED, function() {
      vid.play();
    });

    hls.on(Hls.Events.FRAG_PARSED, function(a, b, c) {
      console.log(a, b, c);
    });

    hls.on(Hls.Events.FRAG_LOADED, function(a, b, c) {
      console.log(a, b, c);
    });
  }

  componentDidMount() {
    this.loadHLSUrl();
  }

  render() {
    return (
      <div>
        <p>HLS Video</p>
        <video id="vid" ref="vid"></video>
      </div>
    );
  }
}

HLS = connect()(HLS);

export default HLS;
