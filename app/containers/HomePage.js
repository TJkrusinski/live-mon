// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

class HomePage extends Component {
  render() {
    return (
      <Home formState={this.props.form} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
