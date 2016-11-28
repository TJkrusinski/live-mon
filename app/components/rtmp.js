// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import styles from './Home.css';
import * as ServerActions from '../actions/server';

class RTMP extends Component {
  
  componentDidMount() {
    videojs.options.flash.swf = 'http://vjs.zencdn.net/4.2/video-js.swf';
    var video = videojs('vid', {}, function(){

      //this.play();
    
    });
  }

  render() {
    return (
      <div>
        <p>RTMP Video</p>
        <video id="vid" controls autoPlay ref="vid" preload="auto" width="640" height="264"
          className="video-js vjs-default-skin vjs-big-play-centered">
          <source src={this.props.server.url} type="rtmp/mp4" />
        </video>
      </div>
    );
  }
}

RTMP = connect()(RTMP);

export default RTMP;
