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

const filterData = data => data ? data.filter(item => {
    console.log('difference day', moment().diff(1544307320182, 'day'));
    return moment().diff(item.value.date, 'day') < 8
    }) : [];
const TodaySnapshot = ({data, title}) => (
    <Card
        title={title}
        extra={<Link to="/dashboard/form"><Button>Add New Entry</Button></Link>}
    >
        <List
            itemLayout="horizontal"
            dataSource={filterData(data)}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src='' />}
                        title={item.value.title}
                        description={`Amount ${item.value.amount} | Date ${moment(item.value.date).format('Do MMMM')}`}
                    />
                </List.Item>
            )}
        />
    </Card>
);

TodaySnapshot.propTypes = {
    data: PropTypes.array,
}
TodaySnapshot.defaultProps = {
    data: [],
}


const generateStats = (data) => {
    if ( data) {
        const totalSpent =  data.map(item => parseInt(item.value.amount)).reduce((a,b) => a+b);
        console.log('total', totalSpent)
        return [{
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
            <TodaySnapshot title="Weekly Transections" data={data} />
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