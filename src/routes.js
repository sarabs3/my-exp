import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {Motion, spring} from 'react-motion';
import Stats from './pages/stats/Month';
import SimpleForm from './pages/form';
import Datalist from './dataList';
import Dashboard from './pages/dashboard';
import Login from './pages/auth/login';
import {Layout} from 'antd'
import Navigation from './components/menu';
import {firebaseConnect, isEmpty, isLoaded} from 'react-redux-firebase'
import { connect } from 'react-redux';
import {compose} from 'redux'

const {Header} = Layout;

export default (props) => (
  <Switch>
    <PrivateRoute path="/list" component={Datalist} />
    <PrivateRoute path="/page" render={()=>(
    <Motion defaultStyle={{x: 0}} style={{x: spring(10)}}>
      {value => <div>{value.x}</div>}
    </Motion>
    )} />
    <PrivateRoute path="/stats" component={Stats} />
    <PrivateRoute path="/form" component={()=> <SimpleForm onSubmit={props.handleSubmit} />} />
    <PrivateRoute path="/Dashboard" component={Dashboard}  />
    <UnProtectedRoute path="/" component={Login}  />
  </Switch>
);

const UnProtectedRouteComponent = (props) => {
  return isLoaded(props.auth)
  ? !isEmpty(props.auth)
    ? <Redirect to='/dashboard' />
    : <Route path={props.path} component={props.component} />
  : 'Loading'
};

const UnProtectedRoute =  compose(firebaseConnect(),
connect( ({firebase: {auth}}) => ({ auth }) )
)(UnProtectedRouteComponent);
const PrivateRouteComponent = (props) => {
  return isLoaded(props.auth)
  ? !isEmpty(props.auth)
    ? (
      <Layout>
          <Header>
              <Navigation />
          </Header>
          <Route path={props.path} component={props.component} />
      </Layout>
    )
    : <Redirect to='/' />
  : 'Loading'
};

const PrivateRoute =  compose(firebaseConnect(),
connect( ({firebase: {auth}}) => ({ auth }) )
)(PrivateRouteComponent)