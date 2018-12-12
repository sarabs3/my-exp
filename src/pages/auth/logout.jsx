import React from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import { connect } from 'react-redux';
import {firebaseConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { Redirect } from "react-router-dom";

const Logout = (props) => {
    props.firebase.logout();
    return <Redirect to='/' />
}

export default compose(firebaseConnect(), connect())(Logout);
