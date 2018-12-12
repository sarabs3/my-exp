import React from 'react';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import { Redirect } from "react-router-dom";

import AddForm from './form';

class Form extends React.Component {
  state = {
    formSubmit: false
  }
  handleSubmit = (values) => {
    const {uid} = this.props;
    this.props.firebase.push(`data/${uid}/`,values)
    .then(() => this.setState(()=>({formSubmit:true})));
  }
  render () {
    const { formSubmit } = this.state;
    if ( formSubmit ) {
      return <Redirect to="/dashboard" from="/dashboard/form" />
    }
    return (
      <AddForm
        onSubmit={this.handleSubmit}
        categories={this.props.categories}
        paymentMode={this.props.paymentMode}
      />
    )
  }
};

export default compose(
  firebaseConnect(['Categories', 'paymentMode']),
  connect(({firebase}) => ({
    categories: firebase.ordered.Categories,
    paymentMode: firebase.ordered.paymentMode,
    uid: firebase.auth.uid,
})))(Form);

