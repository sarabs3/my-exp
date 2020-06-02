import React from 'react'
import {Layout,  Row, Col} from 'antd'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect } from 'react-redux-firebase'
import { Button, Divider } from 'antd';
import { Link } from "react-router-dom";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { concatValues } from "../../utils";
import { currentMonth } from "../../services/currentMonth";

import {Snapshot} from '../../components/snapshot';
import Stats from '../../components/stats';
import Tile from "../../components/Tile/Tile";
import LargeButton from '../../components/Button/Button';
import { formatMoney } from '../../utils/priceFormatting';
const {Content} = Layout;


const filterData = data => data.length ? data.filter(item => moment().isSame(item.value.date, 'day')) : [];
const income = data => data.length && data.reduce((a,b) => ({value: {amount: parseFloat(a.value.amount)+parseFloat(b.value.amount)}})).value.amount;

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
                actions: <Link to='/dashboard/transactions'>View All</Link>
            },
            {
                title: 'Total Spent',
                amount: totalSpent.toFixed(2)
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
};
class Dashboard extends React.Component {
    state = {
        WeeklySnapshotFlag: false,
        historyFlag: false,
    };
    render() {
        const {data, history, savings, loans, accounts } = this.props;
        const thisMonthSaving = savings ? savings : [];
        const totalLoans = loans && loans.length > 0 ? loans.map(k => parseInt(k.value.amount)).reduce((a,b) => a+b) : 0;
        const filteredData = data ? currentMonth(data) : [];
        const totalIncome = this.props.income ? income(currentMonth(this.props.income)) : 0;
        const stats = generateStats(filteredData, concatValues(filteredData));
        const totalSavings = thisMonthSaving.length > 0  ? thisMonthSaving.map(k => parseInt(k.value.amount)).reduce((a,b) => a+b) : 0;
        const accountBalance = accounts ? accounts.map(k => parseInt(k.value.balance)).reduce((a,b) => a+b) : 0;
        return (
            <Content>
                <Row>
                    <Col className="gutter-row" xs={24} sm={24} md={8} lg={8}>
                        <Tile>
                            <h4>Spend in {moment().format('MMMM')}</h4>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                <h5><span className="fas fa-rupee-sign" />&nbsp;{formatMoney(stats[1] && stats[1].amount)}</h5>
                                <h5><Link to="/dashboard/month"><span className="fas fa-arrow-right" /></Link> &nbsp;</h5>
                            </div>
                        </Tile>
                    </Col>
                    <Col className="gutter-row"  xs={24} sm={24} md={8} lg={8}>
                        <Tile>
                            <h4>Income in {moment().format('MMMM')}</h4>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                <h5><span className="fas fa-rupee-sign" />&nbsp;{formatMoney(totalIncome)}</h5>
                                <h5><Link to="/dashboard/income/month"><span className="fas fa-arrow-right" /></Link> &nbsp;</h5>
                            </div>
                        </Tile>
                    </Col>
                    <Col className="gutter-row"  xs={24} sm={24} md={8} lg={8}>
                        <LargeButton onClick={() => history.push('/dashboard/form')}>Add Expense <FontAwesomeIcon icon={faArrowRight} /></LargeButton>
                        <LargeButton onClick={() => history.push('/dashboard/income/add')}>Add income <FontAwesomeIcon icon={faArrowRight} /></LargeButton>
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} md={8} lg={8}>
                        <Tile>
                            <h4>Total Savings</h4>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                <h5><span className="fas fa-rupee-sign" />&nbsp;{formatMoney(totalSavings)}</h5>
                                <h5><Link to="/dashboard/savings"><span className="fas fa-arrow-right" /></Link> &nbsp;</h5>
                            </div>
                        </Tile>
                    </Col>
                    <Col className="gutter-row"  xs={24} sm={24} md={8} lg={8}>
                        <Tile>
                            <h4>Accounts Balance </h4>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                <h5><span className="fas fa-rupee-sign" />&nbsp;{accountBalance}</h5>
                                <h5><Link to="/dashboard/accounts"><span className="fas fa-arrow-right" /></Link> &nbsp;</h5>
                            </div>
                        </Tile>
                    </Col>
                    <Col className="gutter-row"  xs={24} sm={24} md={8} lg={8}>
                        <Tile customStyle={{ background: '#FAAF31' }}>
                            <h4>Liabilities & Loans</h4>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                <h5><span className="fas fa-rupee-sign" />&nbsp;{formatMoney(totalLoans)}</h5>
                                <h5><Link to="/dashboard/loans"><span className="fas fa-arrow-right" /></Link> &nbsp;</h5>
                            </div>
                        </Tile>
                    </Col>
                    <Col span={24}>
                        <React.Suspense fallback={<p>waiting for lazy components...</p>}>
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
            </Content>
        )
    }
}

Dashboard.defaultProps = {
    history: {},
    savings: [],
    loans: [],
    income: []
};

const DashboardEnhancer =  compose(
    firebaseConnect(
        props => (
            [
                'Categories',
                'paymentMode',
                {
                    path: `savings/${props.uid}`,
                    storeAs: 'savings',
                },
                {
                    path: `data/${props.uid}`,
                    storeAs: 'data'
                },
                {
                    path: `income/${props.uid}`,
                    storeAs: 'income'
                },
                {
                    path: `loans/${props.uid}`,
                    storeAs: 'loans'
                },
                {
                    path: `accounts/${props.uid}`,
                    storeAs: 'accounts'
                }
            ]
        )
    ),
    connect(({ firebase }) => (
        {
            Categories: firebase.ordered.Categories,
            paymentMode: firebase.ordered.paymentMode,
            data: firebase.ordered.data,
            income: firebase.ordered.income,
            savings: firebase.ordered.savings,
            loans: firebase.ordered.loans,
            accounts: firebase.ordered.accounts,
        }
    ))
)(Dashboard);

export default connect(({firebase}) => ({
    uid: firebase.auth.uid
}))(DashboardEnhancer);
