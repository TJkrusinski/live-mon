// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import styles from './Home.css';
import * as ServerActions from '../actions/server';

import Player from '../stream/rtmp';

class RTMP extends Component {

  componentWillMount() {
    this.player = new Player(this.props.server.url);

    this.player.spawn();

    this.setState({
      logs: [],
      meta: {}
    });

    this.player.on('stderr', (data) => {

      if (this.player.logHasMetadata(data)) this.parseMetadata(data);
      
      this.setState({
        logs: [data].concat(this.state.logs)
      });
    });

    this.player.on('metaObject', (meta) => {
      this.setState({
        meta: meta
      })
    });
  }

  parseMetadata(data) {
    this.player.parseMetadata(data);
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  showMeta() {
    var logs = Object.keys(this.state.meta);

    if (!logs.length) return null;

    return logs.map((key) => {
      return <li key={key}>{key + ': ' + this.state.meta[key]}</li>;
    });
  }

  showLogs() {
    return this.state.logs.join('\n\r');
  }

  render() {
    return (
      <div>
        <p>RTMP Video</p>
        <ul>
          {this.showMeta()}
        </ul>
        <pre>
          {this.showLogs()}
        </pre>
      </div>
    );
  }
}

RTMP = connect()(RTMP);

export default RTMP;
