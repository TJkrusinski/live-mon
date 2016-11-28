// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import styles from './Home.css';
import * as FormActions from '../actions/form';

let Home = ({dispatch, formState}) => {
  let input;

  let submit = (e) => {
    e.preventDefault();
    let value = input.value.trim();

    if (!value) return dispatch(FormActions.invalidURL(value, 'No URL provided'));
    if (!isURL(value)) return dispatch(FormActions.invalidURL(value, 'Provided URL is invalid'));
    
    dispatch(FormActions.submitURL(input.value));
    dispatch(push('/monitor')); 
  };

  // TODO: write this to actually check the URL
  let isURL = (url) => {
    return url ? true : false;
  };

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
