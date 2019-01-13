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
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ErrorBoundary from '../components/errorBoundry';
import Reports from '../pages/reports';
import ReportsDetail from '../pages/reports/reportsDetail';
import '../pageAnimations.css';

const { Header, Content } = Layout;

// Lazy load modules
const Datalist = React.lazy(() => import('../dataList'));
const Stats = React.lazy(() => import('../pages/stats/Month'));
const Form = React.lazy(() => import('../pages/form'));
const Summary = React.lazy(() => import('../pages/summary'));
const MonthSummary = React.lazy( () => import("../pages/monthSummary"));
const Transections = React.lazy(() => import('../pages/transections'));
const Dashboard = React.lazy( () => import('../pages/dashboard'));
const PrivateRouteComponent = props => (
    isLoaded(props.auth) ? (
        !isEmpty(props.auth) ? (
            <ErrorBoundary>
                <Layout>
                    <Header>
                    <Navigation />
                    </Header>
                    <Content>
                        <TransitionGroup>
                            <CSSTransition
                                key={props.location.key}
                                timeout={300}
                                classNames='page-transition'
                            >
                                <Wrapper>
                                    <Switch location={props.location}>
                                        <Route path="/dashboard/list" component={Datalist} />
                                        <Route path="/dashboard/page" render={()=>(
                                        <Motion defaultStyle={{x: 0}} style={{x: spring(10)}}>
                                            {value => <div>{value.x}</div>}
                                        </Motion>
                                        )} />
                                        <Route path="/dashboard/stats" component={Stats} />
                                        <Route path="/dashboard/form" component={Form} />
                                        <Route path="/dashboard/weekly" component={Summary} />
                                        <Route path="/dashboard/month" component={MonthSummary} />
                                        <Route path="/dashboard/transections" component={Transections} />
                                        <Route path="/dashboard/reports/:year/:month" component={ReportsDetail} />
                                        <Route path="/dashboard/reports" component={Reports} />
                                        <Route path="/" component={Dashboard}  />
                                    </Switch>
                                </Wrapper>
                            </CSSTransition>
                        </TransitionGroup>
                    </Content>
                </Layout>
            </ErrorBoundary>
        ) : <Redirect to="/" />
    ) : <Wrapper><LoaderComponent /></Wrapper>
);

export default compose(
    firebaseConnect(),
    connect(({ firebase: { auth } }) => ({ auth })),
)(PrivateRouteComponent);
