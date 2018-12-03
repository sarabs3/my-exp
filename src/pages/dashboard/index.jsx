import React from 'react'
import {Layout,  Row, Col} from 'antd'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import HistoryWidget from './components/historyWidget';
import SpentWidget from './components/spentWidget';
import PredictionWidget from './components/predictionWidget';
import PaymentMethodWidget from './components/paymentMethodWidget';
import WeeklySnapshot from './components/weeklySnapshot';

const {Content} = Layout;

class Dashboard extends React.Component {
    render() {
        const {Categories = [], paymentMode = []} = this.props;
        return (
            <Content>
                <Row>
                    <Col span={6}>
                        <Row>
                            <Col span={24}>
                                <HistoryWidget />
                            </Col>
                            <Col span={24}>
                                <SpentWidget categories={Categories} />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <WeeklySnapshot />
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
                </Row>
            </Content>
        )
    }
}

export default compose(firebaseConnect(['Categories', 'paymentMode']),
connect(({firebase}) => ({
    Categories: firebase.ordered.Categories,
    paymentMode: firebase.ordered.paymentMode
})))(Dashboard);