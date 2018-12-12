import React, {Fragment} from 'react'
import {Layout,  Row, Col} from 'antd'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, getVal } from 'react-redux-firebase'
import HistoryWidget from './components/historyWidget';
import SpentWidget from './components/spentWidget';
import PredictionWidget from './components/predictionWidget';
import PaymentMethodWidget from './components/paymentMethodWidget';
import WeeklySnapshot from './components/weeklySnapshot';
import TodaySnapshot from './components/todaySnapshot';
import Media from "react-media";

const {Content} = Layout;

const Leftbar = (props) => (
    <Row>
        <Col span={24}>
            <TodaySnapshot data={props.data} />
        </Col>
        <Col span={24}>
            <SpentWidget categories={props.Categories} />
        </Col>
    </Row>
)
class Dashboard extends React.Component {
    render() {
        console.log('props', this.props)
        const {Categories = [], paymentMode = [], data} = this.props;
        return (
            <Content>
                <Row>
                    <Media query="(max-width: 900px)">
                        {matches => matches ? (
                            <Col span={24}>
                                <Leftbar data={data} Categories={Categories} />
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