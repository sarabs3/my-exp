import React from 'react';
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import {List, Divider } from 'antd';
import { Link } from "react-router-dom";
import moment from 'moment';
import Reports from './reports.component';

window.moment = moment;
const getD = (data, filter) =>  data.filter(item => {
    const month = moment(item.value.date).format('MMMM');
    const year = moment(item.value.date).year();
    return filter.month === month && filter.year == year;
});

const ReportsDetail = (props) => {
    console.log('props', props);
    if (props.data && props.data.length) {
        const filterData = getD(props.data, {year:props.match.params.year, month: props.match.params.month});
        const total = filterData.reduce((a,b) => ({value: {amount: parseFloat(a.value.amount)+parseFloat(b.value.amount)}})).value.amount
        console.log(total);
    return (
        <React.Fragment>
            <Divider />
            <h1>Reports {props.match.params.month} {props.match.params.year}</h1>
            <Divider />
            Total Spent: {total}
            <List
                bordered
                dataSource={filterData}
                renderItem={(item) => (
                    <List.Item>
                        <Link to={`/dashboard/reports/`}>
                            {item.value.title}
                        </Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <p>
                            {item.value.amount}
                            </p>&nbsp;&nbsp;&nbsp;&nbsp;
                            <p>
                            {moment(item.value.date).format('DD MMMM')}
                            </p>
                    </List.Item>
                )}
            />
        </React.Fragment>
    );
    } else {
        return <p>loading</p>
    }
}

const enhancer =  compose(
    firebaseConnect(
        props => (
            [
                {
                    path: `data/${props.uid}`,
                    storeAs: 'data',
                    queryParams: ['orderByChild=date']
                }
            ]
        )),
    connect(
        ({firebase}) => ({
            data: firebase.ordered.data,
            uid: firebase.auth.uid
        }))
);


const SummaryEnhancer = enhancer(ReportsDetail);


export default connect(
    ({firebase}) => ({
        uid: firebase.auth.uid
    })
)(SummaryEnhancer);