// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Home from '../components/Home';
import * as FormActions from '../actions/form';

function mapStateToProps(state) {
  return {
    form: state.form
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FormActions, dispatch);
}

class MonitorPage extends Component {

  componentWillMount() {
    var url = this.props.form && this.props.form.url;
    if (!url) return this.props.router.push('/');
  }

  componentDidMount() {
    if (!this.props.form) return;

    var url = this.props.form.url;

    if (!url) throw new Error('No url found to load');

    var type = this.urlType(url);

    if (type.hls && !type.rtmp) this.loadHLSUrl(url);
    if (type.rtmp && !type.hls) this.loadRTMPUrl(url);

    if (!type.hls && !type.rtmp) this.invalidUrl();
  }

  invalidUrl() {
    // TODO: refactor this to the form validation page as well
    this.props.router.push('/');
  }

  urlType(url) {
    var type = {
      hls: false,
      rtmp: false
    };

    if (url.match(/^rtmp\:/)) type.rtmp = true;
    if (url.match(/^http\:/)) type.hls = true;

    return type;
  }

  loadRMPTUrl(url) {
    // TODO: do this
  }

  loadHLSUrl(url) {
    var hls = new Hls();
    var vid = this.refs.vid;
    console.log('lkjsdflkjsdflkj');

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

  render() {
    if (!this.props.form) return null;

    return (
      <div>
        <Link to="/">Cancel</Link>
        <h1>Let us do this </h1>
        <p>{this.props.form.url}</p>
        <video id="vid" ref="vid"></video>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonitorPage);
