import React from 'react';
import {Card} from 'antd';
import { Button } from 'antd';
import { List, Avatar } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {DateInList} from '../dateInList';

const Snapshot = ({data, title, icon, type}) => (
    <Card
        title={title}
        extra={(
            <Link to="/dashboard/form">
                <Button>Add New Entry</Button>
            </Link>
        )}
    >
        <List
            itemLayout="vertical"
            dataSource={data}
            renderItem={item => {
                const {avatar, value: {title, amount, date}} = item;
                const day = moment(date).format('Do');
                const month = moment(date).format(' MMM');
                return (
                    <List.Item
                        extra={<DateInList date={day} month={month} />}
                    >
                        <List.Item.Meta
                            avatar={
                                icon ? <Avatar src={avatar} /> : null
                            }
                            title={title}
                            description={type === 'today' ? amount : `Amount ${amount} `}
                        />
                    </List.Item>
                )
            }}
        />
    </Card>
);

Snapshot.propTypes = {
data: PropTypes.array,
}
Snapshot.defaultProps = {
data: [],
}

export default Snapshot;