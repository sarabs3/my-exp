import React from 'react'
import {Layout,  Row, Col, Card} from 'antd'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'

const {Content} = Layout;

class Dashboard extends React.Component {
    render() {
        const {Categories} = this.props;
        return (
            <Content>
                <Row>
                    <Col span={6}>
                        <Card title="History">
                            <p>Total Spent Yesterday: 100</p>
                            <p>Total Spent Last Week: 700</p>
                            <p>Total Spent Last Month: 3000</p>
                            <p>T---------------------: 700</p>
                            <p>T---------------------: 3000</p>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="Most Spent By Category">
                        {Categories && Categories.map(item => (
                        <p key={item.key}>{item.value} 500</p>
                    ))}
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Card title="Future">
                            <p>Expected Spent per day: 100</p>
                            <p>Expected Spent for Week: 700</p>
                            <p>Expected Spent for Month: 3000</p>
                            <p>T---------------------: 700</p>
                            <p>T---------------------: 3000</p>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="Spending Trend by Payment Method of Month ">
                            <p>Kotak Credit Card: 1200</p>
                            <p>Cash: 700</p>
                            <p>HDFC Credit Card: 3000</p>
                            <p>Debit Card: 1200</p>
                            <p>Internet Banking: 3000</p>
                        </Card>
                    </Col>
                </Row>
            </Content>
        )
    }
}

export default compose(firebaseConnect(['Categories']),
connect(({firebase}) => ({Categories: firebase.ordered.Categories})))(Dashboard);