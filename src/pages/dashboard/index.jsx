import React, {Fragment} from 'react'
import {Layout,  Row, Col} from 'antd'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, getVal } from 'react-redux-firebase'
import HistoryWidget from './components/historyWidget';
import PredictionWidget from './components/predictionWidget';
import PaymentMethodWidget from './components/paymentMethodWidget';
import WeeklySnapshot from './components/weeklySnapshot';
import Media from "react-media";
import { Button, Divider } from 'antd';
import { Link } from "react-router-dom";
import moment from 'moment';
import { concatValues } from "../../utils";
import { currentMonth } from "../../services/currentMonth";

import {Snapshot} from '../../components/snapshot';
import SpentWidget from './components/spentWidget';
import Stats from '../../components/stats';

const {Content} = Layout;

const Leftbar = (props) => (
    <Row>
        <Col span={24}>
            <React.Suspense fallback={<p>waiting for lazy componenets...</p>}>
                <Snapshot
                    title='Today Snapshot'
                    type='today'
                    data={props.data ? filterData(props.data) : []}
                    icon
                />
            </React.Suspense>
        </Col>
        <Col span={24}>
            <React.Suspense fallback={<p>waiting for lazy componenets...</p>}>
                <SpentWidget categories={props.Categories} />
            </React.Suspense>
        </Col>
    </Row>
)
const filterData = data => data.length ? data.filter(item => moment().isSame(item.value.date, 'day')) : [];
const generateStats = (data, total) => {
    if ( data.length ) {
        const totalSpent = concatValues(data);
        let notToCount = data.filter(item => item.value.mode ? !item.value.mode.includes('Credit') : false);
        let Savings = data.filter(item => item.value.category ? item.value.category.includes('Savings') : false);
        Savings = Savings.length ? concatValues(Savings).toFixed(2) : 0;
        notToCount = notToCount.length ? concatValues(notToCount).toFixed(2) : 0;
        return [
            {
                title: 'Transections',
                amount: data.length,
                actions: <Link to='/dashboard/transections'>View All</Link>
            },
            {
                title: 'Total Spent',
                amount: totalSpent
            },
            {
                title: 'Cash Exp',
                amount: (totalSpent - notToCount).toFixed(2)
            },
            {
                title: 'Credit Exp',
                amount: notToCount
            },
            {
                title: 'Per Day Average Month',
                amount: (total/moment().date()).toFixed(2)
            },
            {
                title: 'Expected Average Month',
                amount: ((total/moment().date()).toFixed(2))*30
            },
            {
                title: 'Savings',
                amount: Savings
            }
        ]
    } else {
        return []
    }
}
class Dashboard extends React.Component {

    render() {
        const {Categories = [], paymentMode = [], data} = this.props;
        if (!data) {
            return null
        }
        const filteredData = currentMonth(data);
        const stats = generateStats(filteredData, concatValues(filteredData));
        return (
            <Content>
                <Row>
                    <Media query="(max-width: 900px)">
                        {matches => matches ? (
                            <Col span={24}>
                                <Row>
                                    <Col span={24}>
                                        <React.Suspense fallback={<p>waiting for lazy componenets...</p>}>
                                            <Stats
                                                title="Recent Stats"
                                                data={stats}
                                                component={
                                                    <Button onClick={this.prevWeek}>Previous Week</Button>
                                                }
                                            />
                                        </React.Suspense>
                                        <React.Suspense fallback={<p>waiting for lazy componenets...</p>}>
                                            <Snapshot
                                                title='Today Transections'
                                                type='today'
                                                data={data ? filterData(data) : []}
                                            />
                                        </React.Suspense>
                                    </Col>
                                    <Col span={24}>
                                        <Button type="primary" block size="large">
                                            <Link to="/dashboard/weekly">Weekly Summary</Link>
                                        </Button>
                                        <Divider />
                                        <Button type="primary" block size="large">
                                            <Link to="/dashboard/month">Month Summary</Link>
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                    ) : (
                            <Col span={6}>
                                <Leftbar data={data} Categories={Categories} />
                            </Col>
                    )}
                    </Media>
                    <Media query="(min-width: 900px)">
                        {
                            matches => matches ? (
                                <Fragment>
                                    <Col span={12}>
                                        <WeeklySnapshot />
                                        <Row>
                                            <Col span={12}>
                                                <HistoryWidget />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={6}>
                                        <Row>
                                            <Col span={24}>
                                                <PredictionWidget />
                                            </Col>
                                            <Col span={24}>
                                                <PaymentMethodWidget paymentMode={paymentMode} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Fragment>
                            )    : null
                        }
                    </Media>
                </Row>
            </Content>
        )
    }
}

const DashboardEnhancer =  compose(
    firebaseConnect(
        props => (
            [
                'Categories',
                'paymentMode',
                {
                    path: `data/${props.uid}`,
                    storeAs: 'data'
                }
            ]
        )
    ),
    connect(({ firebase }) => (
        {
            Categories: firebase.ordered.Categories,
            paymentMode: firebase.ordered.paymentMode,
            data: firebase.ordered.data,
        }
    ))
)(Dashboard);

export default connect(({firebase}) => ({
    uid: firebase.auth.uid
}))(DashboardEnhancer);
