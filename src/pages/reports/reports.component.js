import React from 'react';
import {List } from 'antd';
import { Link } from "react-router-dom";

const data = [
    {
        month:'January',
        year: '2019'
    },
    {
        month:'December',
        year: '2018',
    },
    {
        month:'November',
        year: '2018',
    },
    {
        month:'October',
        year: '2018',
    }
];

const Reports = () => {
    return (
        <List
            bordered
            dataSource={data}
            renderItem={({year, month}) => (<List.Item><Link to={`/dashboard/reports/${year}/${month}`}>{month} {year}</Link></List.Item>)}
        />
    );
}

export default Reports;