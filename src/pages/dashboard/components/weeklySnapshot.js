import React from 'react';
import {Card} from 'antd';

const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];
const WeeklySnapshot = () => (
    <Card title="Weekly Snapshot">
        {days.map(day => <WeekEntry key={day} entry={{day}} />)}
    </Card>
)

const WeekEntryStyles = {
    display: 'flex',
    justifyContent: 'space-between'
};
const WeekEntry = ({entry}) => (
    <div style={WeekEntryStyles}>
        <p style={{width: '100px'}}>{entry.day}</p>
        <div>Total Week</div>
        <div>Avg. Week</div>
        <div>Total Month</div>
        <div>Avg. Day</div>
        <div>Avg. Month</div>
        <button>Edit</button>
    </div>
)

export default WeeklySnapshot;