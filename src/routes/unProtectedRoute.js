import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import {firebaseConnect, isEmpty, isLoaded} from 'react-redux-firebase'
import LoaderComponent from '../components/loader';
import Wrapper from '../components/wrapper';

const UnProtectedRouteComponent = (props) => {
  return isLoaded(props.auth)
  ? !isEmpty(props.auth)
    ? <Redirect to='/dashboard' />
    : <Wrapper><Route path={props.path} component={props.component} /></Wrapper>
  : <Wrapper><LoaderComponent /></Wrapper>
};

export default compose(
    firebaseConnect(),
    connect( ({firebase: {auth}}) => ({ auth }) )
)(UnProtectedRouteComponent);
