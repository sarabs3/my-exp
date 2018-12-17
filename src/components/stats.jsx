import React from 'react';
import PropTypes from 'prop-types';
import { Card, List, Avatar } from "antd";
const Stats = ({data, title, avatar, component}) => (
    <Card
        title={title}
        extra={component}
    >
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={
                item => (
                    <List.Item actions={[item.actions]}>
                        <List.Item.Meta
                            avatar={avatar ? <Avatar src={item.Avatar} /> : null}
                            title={item.title}
                            description={item.amount}
                        />
                    </List.Item>
                )
            }
        />
    </Card>
);

Stats.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    avatar: PropTypes.bool
}

export default Stats;