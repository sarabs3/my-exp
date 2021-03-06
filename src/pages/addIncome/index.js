import React from 'react';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import { Redirect } from "react-router-dom";

import AddForm from './AddIncome';

class Income extends React.Component {
  state = {
    formSubmit: false
  }
  handleSubmit = (values) => {
    const {uid} = this.props;
    this.props.firebase.push(`income/${uid}/`,{ ...values })
        .then(() => {
          this.setState(()=>({formSubmit:true}));
          if (values.mode) {
              //const balance = parseInt(values.mode.value.balance, 10) + parseInt(values.amount, 10);
              const balance = 0;
              this.props.firebase.update(`accounts/${uid}/${values.mode.key}`,{ ...values.mode.value, balance });
          }
        });
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
}

const FormEnhancer = compose(
  firebaseConnect((props) => ([
      {
          path: `Categories/${props.uid}`,
          storeAs: 'Categories'
      },
      {
        path: `accounts/${props.uid}/`,
        storeAs: 'paymentMode',
      },
  ])),
  connect(({firebase}) => ({
    categories: firebase.ordered.Categories,
    paymentMode: firebase.ordered.paymentMode,
    uid: firebase.auth.uid,
})))(Income);

export default connect(({firebase}) => ({
  uid: firebase.auth.uid
}))(FormEnhancer);
