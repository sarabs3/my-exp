import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import Stats from "../components/stats";
import { sort } from "../utils";
import {Snapshot} from "../components/snapshot";
import { currentMonth } from "../services/currentMonth";

const generateStats = (data) => {
    if ( data) {
        const totalSpent =  data.length && data.map(item => parseInt(item.value.amount)).reduce((a,b) => a+b);
        return [{
            title: 'Transections',
            amount: data.length,
            actions: <Link to='/dashboard/transections'>View All</Link>
        },{
            title: 'Spent',
            amount: totalSpent
        },
        {
            title: 'Per Day Average',
            amount: (totalSpent / 30).toFixed(2)
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
    if (!data) {
        return null;
    }
    const stats = generateStats(currentMonth(data))
    return (
        <React.Fragment>
            <Stats title="Monthly Summary" data={stats} />
            <Snapshot avatar={false} title="Monthly Transections" data={sort(currentMonth(data), sorted)} sorted/>
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