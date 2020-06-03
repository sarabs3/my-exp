import React from 'react';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import { Redirect } from "react-router-dom";

import AddForm from './form';

class Form extends React.Component {
  state = {
    formSubmit: false
  };
  handleSubmit = (values) => {
    const {uid} = this.props;
    const loanAccount = values.loanAccount ? values.loanAccount : {};
    this.props.firebase.push(`data/${uid}/`,{ ...values, mode: values.mode.key, loanAccount: loanAccount.key })
    .then(() => {
      this.setState(()=>({formSubmit:true}));
      const balance = parseInt(values.mode.value.balance) - parseInt(values.amount);
      this.props.firebase.update(`accounts/${uid}/${values.mode.key}`,{ ...values.mode.value, balance })
        .then(() => {
            if (values.category == 7) {
              const loanBalance = parseInt(values.loanAccount.value.balance) - parseInt(values.amount);
              console.log('values.loanAccount', values.loanAccount, loanBalance);
              this.props.firebase.update(`loans/${uid}/${values.loanAccount.key}`, { ...values.loanAccount.value, balance: loanBalance });
            }
        })

    });
  };
  handleSavings = (values) => {
    const {uid} = this.props;
    this.props.firebase.push(`savings/${uid}/`,values)
    .then(() => this.setState(()=>({formSubmit:true})));
  };
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
        savingAccounts={this.props.savingAccounts}
        loanAccounts={this.props.loanAccounts}
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
      },
      {
        path: `loans/${props.uid}/`,
        storeAs: 'loanAccounts',
      }
    ]
  )),
  connect(({firebase}) => ({
    categories: firebase.ordered.Categories,
    paymentMode: firebase.ordered.paymentMode,
    savingAccounts: firebase.ordered.savingAccounts,
    loanAccounts: firebase.ordered.loanAccounts,
    uid: firebase.auth.uid,
})))(Form);

export default connect(({firebase}) => ({
  uid: firebase.auth.uid
}))(FormEnhancer);
