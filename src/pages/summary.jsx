import React from 'react';
import {Card} from 'antd';
import { Button } from 'antd';
import { List, Avatar } from 'antd';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import Stats from "../components/stats";
import { sort } from "../utils";

const filterData = data => data ? data.filter(
    item => {
        const dayOfWeek = moment().day();
        const startOfWeek = (
            moment().add(`-${dayOfWeek}`, 'day').startOf('day').unix()
        )*1000;
        return moment(item.value.date).isBetween(startOfWeek, moment().endOf('day'))
    }
    ) : [];


const generateStats = (data) => {
    if ( data) {
        const totalSpent =  data.map(item => parseInt(item.value.amount)).reduce((a,b) => a+b);
        console.log('total', totalSpent)
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
                title: 'Week Average',
                amount: totalSpent / 7
            },
            {
                title: 'Exp',
                amount: 0
            },
            {
                title: 'Income',
            },
            {
                title: 'Not To Count'
            },
            {
                title: 'Savings'
            }
        ]
    } else {
        return []
    }
}
const Summary = ({data, sorted = true}) => {
    const stats = generateStats(data)
    return (
        <React.Fragment>
            <Stats title="Weekly Summary" data={stats} />
            <TodaySnapshot title="Weekly Transections" data={sort(filterData(data), sorted)} sorted={sorted} />
        </React.Fragment>
    )
};

const enhancer = compose(
    firebaseConnect(
        props => (
            [
                {
                    path: `data/${props.uid}`,
                    storeAs: 'data',
                    queryParams: ['orderByChild=date']
                }
            ]
        )
    ),
    connect(
        ({firebase}) => ({
            data: firebase.ordered.data,
            uid: firebase.auth.uid
        })
    )
);

const SummaryEnhancer = enhancer(Summary);


export default connect(
    ({firebase}) => ({
        uid: firebase.auth.uid
    })
)(SummaryEnhancer);