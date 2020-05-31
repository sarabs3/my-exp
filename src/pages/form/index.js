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
  handleSubmit = (values, savings) => {
    const {uid} = this.props;
    this.props.firebase.push(`data/${uid}/`,values)
    .then(() => this.setState(()=>({formSubmit:true})));
  }
  handleSavings = (values) => {
    const {uid} = this.props;
    this.props.firebase.push(`savings/${uid}/`,values)
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
        handleSavings={this.handleSavings}
        categories={this.props.categories}
        paymentMode={this.props.paymentMode}
      />
    )
  }
};

const FormEnhancer = compose(
  firebaseConnect((props) => (
    [
      'Categories',
      {
        path: `accounts/${props.uid}/`,
        storeAs: 'paymentMode',
      },
      {
        path: `savingAccounts/${props.uid}/`,
        storeAs: 'savingAccounts',
      }
    ]
  )),
  connect(({firebase}) => ({
    categories: firebase.ordered.Categories,
    paymentMode: firebase.ordered.paymentMode,
    savingAccounts: firebase.ordered.savingAccounts,
    uid: firebase.auth.uid,
})))(Form);

export default connect(({firebase}) => ({
  uid: firebase.auth.uid
}))(FormEnhancer);
