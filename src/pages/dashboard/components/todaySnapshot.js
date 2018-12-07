import React from 'react';
import {Card} from 'antd';
import { Button } from 'antd';
import { List, Avatar } from 'antd';
import {Link} from 'react-router-dom';
import categoryIcon from '../../../assets/categoryIcon.svg'

const days = [
    {title: 'Monday', amount: 50},
    {title: 'Tuesday', amount: 1675},
    {title: 'Wednesday', amount: 32},
    {title: 'Thursday', amount: 140},
    {title: 'Friday', amount: 100},
    {title: 'Saturday', amount: 190},
    {title: 'Sunday', amount: 850}
];
const TodaySnapshot = () => (
    <Card
        title="Today Snapshot"
        extra={<Link to="/form"><Button>Add New Entry</Button></Link>}
    >
        <List
            itemLayout="horizontal"
            dataSource={days}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={categoryIcon} />}
                        title={item.title}
                        description={item.amount}
                    />
                </List.Item>
            )}
        />
    </Card>
)


export default TodaySnapshot;