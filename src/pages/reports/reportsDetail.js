import React from 'react';
import {List, Divider } from 'antd';
import { Link } from "react-router-dom";
import moment from 'moment';

window.moment = moment;

const ReportsDetail = ({ filterData, group, ...props }) => {
    if (props.data && props.data.length) {
        let savings =  filterData.filter(item => item.value.category === 'Savings');
        savings = savings.reduce((a,b) => ({value: {amount: parseFloat(a.value.amount)+parseFloat(b.value.amount)}})).value.amount;
        const total = filterData.reduce((a,b) => ({value: {amount: parseFloat(a.value.amount)+parseFloat(b.value.amount)}})).value.amount;
        const stats = [
            {
                title: 'All Transec.',
                value: total
            },
            {
                title: 'Exppenses',
                value: total - savings
            },
            {
                title: 'Savings',
                value: savings
            }
        ]
    return (
        <React.Fragment>
            <Divider />
            <h1>Reports {props.match.params.month} {props.match.params.year}</h1>
            <Divider />
            <List
                bordered
                dataSource={stats}
                renderItem={item => (
                    <List.Item>
                        {item.title} : {item.value}
                    </List.Item>
                )}
            />
            {Object.keys(group).map(item => (
                <React.Fragment>
                    <h3>{item} {group[item].reduce((a,b) => ({value: {amount: parseFloat(a.value.amount)+parseFloat(b.value.amount)}})).value.amount}</h3>
                <List key={item}
                    bordered
                    dataSource={group[item]}
                    renderItem={item => (
                        <List.Item>
                            <h5>{item.value.title}</h5>
                            <h5>{item.value.amount}</h5>
                        </List.Item>
                    )}
                />
                </React.Fragment>
            ))}
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


export default ReportsDetail;
