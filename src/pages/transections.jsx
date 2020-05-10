import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import {Snapshot} from "../components/snapshot";
import { sort, concatValues } from "../utils";

const Transections = (data, total) => {
    if ( data.length ) {
        const totalSpent = concatValues(data);
        let notToCount = data.filter(item => !item.value.mode.includes('Credit'));
        notToCount = concatValues(notToCount);
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
                amount: (totalSpent / 7).toFixed(2)
            },
            {
                title: 'Cash Exp',
                amount: totalSpent - notToCount
            },
            {
                title: 'Credit Exp',
                amount: notToCount
            },
            {
                title: 'Per Day Average Month',
                amount: (total/moment().date()).toFixed(2)
            },
        ]
    } else {
        return []
    }
}
class Summary extends React.Component {
    state = {
        dayOfWeek: moment().day(),
        today: moment(),
        startOfWeek: (moment().add(`-${moment().day()}`, 'day').startOf('day').unix())*1000,
        currentWeek: 0
    }
    prevWeek = () => {
        this.setState(state => ({
            currentWeek: state.currentWeek - 1,
            today: moment().add(`-${moment().day() + 1}`, 'day'),
            startOfWeek: (moment().add(`-${moment().day() + 7}`, 'day').startOf('day').unix())*1000
        }))
    }
    filterData = data => data ? data.filter(
        item => {
            const {startOfWeek, today} = this.state;
            return moment(item.value.date).isBetween(startOfWeek, today.endOf('day'))
        }
    ) : [];
    render () {
        const {data, sorted = true} = this.props;
        if (!data) {
            return null;
        }
        const filteredData = data;
        const stats = Transections(filteredData, concatValues(data));
        const transectionsdata = sort(filteredData, sorted);
        return (
            <React.Fragment>
                <Snapshot title={`All Transactions ${transectionsdata.length}`} data={transectionsdata} sorted={sorted} />
            </React.Fragment>
        )
    }
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