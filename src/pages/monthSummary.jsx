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
    return moment().diff(item.value.date, 'day') < 31
    }) : [];
const TodaySnapshot = ({data, title, sorted}) => (
    <Card
        title={title}
        extra={<Link to="/dashboard/form"><Button>Add New Entry</Button></Link>}
    >
        <List
            itemLayout="horizontal"
            dataSource={sort(filterData(data), sorted)}
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
    sorted: PropTypes.bool,
    title: PropTypes.string
}
TodaySnapshot.defaultProps = {
    data: [],
}


const generateStats = (data) => {
    if ( data) {
        const totalSpent =  data.map(item => parseInt(item.value.amount)).reduce((a,b) => a+b);
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
    const stats = generateStats(data)
    return (
        <React.Fragment>
            <Stats title="Monthly Summary" data={stats} />
            <TodaySnapshot avatar={false} title="Monthly Transections" data={data} sorted/>
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