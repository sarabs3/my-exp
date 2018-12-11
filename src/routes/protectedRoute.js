import React from 'react';
import { Layout } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom';
import Navigation from '../components/menu';
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import LoaderComponent from '../components/loader';
import Wrapper from '../components/wrapper';
import {Motion, spring} from 'react-motion';
import Stats from '../pages/stats/Month';
import SimpleForm from '../pages/form';
import Datalist from '../dataList';
import Dashboard from '../pages/dashboard';
import { CSSTransition, TransitionGroup } from "react-transition-group";

import '../pageAnimations.css';



const { Header } = Layout;

const PrivateRouteComponent = props => {
  return isLoaded(props.auth) ? (
    !isEmpty(props.auth) ? (
        <Layout>
            <Header>
            <Navigation />
            </Header>
            <TransitionGroup>
                <CSSTransition
                    key={props.location.key}
                    timeout={300}
                    classNames='page-transition'
                >
                    <Wrapper>
                        <Switch location={props.location}>
                            <Route path="/list" component={Datalist} />
                            <Route path="/page" render={()=>(
                            <Motion defaultStyle={{x: 0}} style={{x: spring(10)}}>
                                {value => <div>{value.x}</div>}
                            </Motion>
                            )} />
                            <Route path="/dashboard/stats" component={Stats} />
                            <Route path="/dashboard/form" component={()=> <SimpleForm onSubmit={props.handleSubmit} />} />
                            <Route path="/" component={Dashboard}  />
                            {/* <Route path="/dashboard" component={PrivateRoute} />
                            <UnProtectedRoute path="/" component={Login}  /> */}
                        </Switch>
                    </Wrapper>
                </CSSTransition>
            </TransitionGroup>
        </Layout>
    ) : (
      <Redirect to="/" />
    )
  ) : (
    <Wrapper><LoaderComponent /></Wrapper>
  );
};

export default compose(
    firebaseConnect(),
    connect(({ firebase: { auth } }) => ({ auth })),
)(PrivateRouteComponent);
