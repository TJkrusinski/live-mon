// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import styles from './Home.css';
import * as FormActions from '../actions/form';
import * as ServerActions from '../actions/server';

let Home = ({dispatch, formState}) => {
  let input;

  let submit = (e) => {
    e.preventDefault();
    let value = input.value.trim();
    let type = urlType(value);

    console.log(type);

    if (!value) return dispatch(FormActions.invalidURL(value, 'No URL provided'));
    if (!isURL(value)) return dispatch(FormActions.invalidURL(value, 'Provided URL is invalid'));

    dispatch(FormActions.submitURL(value));
    dispatch(ServerActions.addServer(value));

    if (type.hls) dispatch(ServerActions.isHLS());
    if (type.rtmp) dispatch(ServerActions.isRTMP());

    dispatch(push('/monitor'));
  };

  let isURL = (url) => {
    var type = urlType(url);
    return type.hls || type.rtmp;
  };

  let urlType = (url) => {
    var type = {
      hls: false,
      rtmp: false
    };

    if (url.match(/^rtmp\:/)) type.rtmp = true;
    if (url.match(/^http\:/)) type.hls = true;

    return type;
  }

  let errorText = () => {
    if (formState && formState.invalid && formState.reason) return (
      <p>{formState.reason}</p>
    );
  }

  return (
    <div>
      <div className={styles.container}>
        <h2>Live Video Monitor</h2>
        <p>Enter RTMP or HLS URL below</p>
        <div>
          {errorText()}
          <form onSubmit={submit}>
            <input type="text" ref={node => {
              input = node;
            }} />
            <button>
              Track
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

Home = connect()(Home);

export default Home;
