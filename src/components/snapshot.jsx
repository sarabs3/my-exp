import React from 'react';
import {Card} from 'antd';
import { Button } from 'antd';
import { List, Avatar } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Link} from 'react-router-dom';
import categoryIcon from '../assets/categoryIcon.svg'

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
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => {
                const {avatar, value: {title, amount, date}} = item;
                const formatedDate = moment(date).format('Do MMMM');
                return (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                icon ? <Avatar src={avatar} /> : null
                            }
                            title={title}
                            description={type === 'today' ? amount : `Amount ${amount} | Date ${formatedDate}`}
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