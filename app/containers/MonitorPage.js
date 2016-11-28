// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Home from '../components/Home';
import RTMP from '../components/rtmp';
import HLS from '../components/hls';
import videoStyles from '../components/videoStyles.css';
import * as FormActions from '../actions/form';
import * as ServerActions from '../actions/server';

function mapStateToProps(state) {
  return {
    form: state.form,
    server: state.server
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FormActions, dispatch);
}

class MonitorPage extends Component {

  loadPlayer() {
    var server = this.props.server;
    console.log(this.props.server);
    if (this.props.server.hls) return <HLS server={server} />;
    if (this.props.server.rtmp) return <RTMP server={server} />;
  }

  componentWillMount() {
    if (!this.props.server.url) return this.props.router.push('/');
  }

  render() {

    return (
      <div>
        <Link to="/">Cancel</Link>
        {this.loadPlayer()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonitorPage);
