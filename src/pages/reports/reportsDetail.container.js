import React from 'react';
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import ReportsDetail from './reportsDetail';
import moment from 'moment';
import {groupBy} from '../../utils';

const getD = (data, filter) =>  data.length && data.filter(item => {
    const month = moment(item.value.date).format('MMMM');
    const year = moment(item.value.date).year();
    return filter.month === month && filter.year === year;
});

class ReportsDetailContainer extends React.PureComponent {
    render = () => {
        const { data, match } = this.props;
        if (!data) {
            return null;
        }
        const filterData = getD(data, {year:match.params.year, month: match.params.month});
        const group = groupBy(filterData, item => item.value.category);
        // render
        return <ReportsDetail {...this.props} filterData={filterData} group={group} />
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


const SummaryEnhancer = enhancer(ReportsDetailContainer);


export default connect(
    ({firebase}) => ({
        uid: firebase.auth.uid
    })
)(SummaryEnhancer);
