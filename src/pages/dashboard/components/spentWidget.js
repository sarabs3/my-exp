import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd'
const SpentWidget = ({categories}) => (
    <Card title="Most Spent By Category">
        {categories && categories.map(item => (
            <p key={item.key}>{item.value} </p>
        ))}
    </Card>
);

SpentWidget.propTypes = {
    categories: PropTypes.array.isRequired
}

export default SpentWidget;