import React from 'react';
import {Card} from 'antd';
import { Button } from 'antd';
import { List, Avatar } from 'antd';
import {Link} from 'react-router-dom';
import categoryIcon from '../../../assets/categoryIcon.svg'
import PropTypes from 'prop-types';
import moment from 'moment';

const filterData = data => data ? data.filter(item => moment().isSame(item.value.date, 'day')) : [];
const TodaySnapshot = ({data}) => (
    <Card
        title="Today Snapshot"
        extra={<Link to="/dashboard/form"><Button>Add New Entry</Button></Link>}
    >
        <List
            itemLayout="horizontal"
            dataSource={filterData(data)}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={categoryIcon} />}
                        title={item.value.title}
                        description={item.value.amount}
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

export default TodaySnapshot;