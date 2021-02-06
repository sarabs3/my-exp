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
import ReportsDetail from '../pages/reports/reportsDetail.container';
import '../pageAnimations.css';


// Lazy load modules
import Datalist from '../dataList';
import Stats from '../pages/stats/Month';
import Form from '../pages/form';
import AddIncome from "../pages/addIncome";
import Summary from '../pages/summary';
import MonthSummary from "../pages/monthSummary";
import MonthIncomeSummary from '../pages/MonthlyIncomeSummary';
import Transactions from '../pages/transections';
import TransactionsDetail from '../pages/transectionsDetails.page';
import Dashboard from '../pages/dashboard';
import Accounts from '../pages/Accounts';
import Loans from "../pages/Loans/Loans";
import Savings from "../pages/Savings/Savings";
import ViewSavingAccount from "../pages/Savings/ViewSavingAccount";
import Categories from "../pages/Categories/Categories";
import AddCategory from "../pages/Categories/AddCategory";

const { Header, Content } = Layout;


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
                                        <Route path="/dashboard/income/month" component={MonthIncomeSummary} />
                                        <Route path="/dashboard/transactions/:id" component={TransactionsDetail} />
                                        <Route path="/dashboard/transactions" component={Transactions} />
                                        <Route path="/dashboard/reports/:year/:month" component={ReportsDetail} />
                                        <Route path="/dashboard/reports" component={Reports} />
                                        <Route path="/dashboard/add/" component={AddIncome} />
                                        <Route path="/dashboard/add/income" component={AddIncome} />
                                        <Route path="/dashboard/accounts" component={Accounts} />
                                        <Route path="/dashboard/income/add" component={AddIncome} />
                                        <Route path="/dashboard/loans" component={Loans} />
                                        <Route path="/dashboard/categories" exact component={Categories} />
                                        <Route path="/dashboard/categories/add" exact component={AddCategory} />
                                        <Route path="/dashboard/categories/edit/:id" exact component={AddCategory} />
                                        <Route path="/dashboard/savings/:id" component={ViewSavingAccount} />
                                        <Route path="/dashboard/savings" component={Savings} />
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
