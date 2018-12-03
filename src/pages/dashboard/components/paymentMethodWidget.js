import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd'
const PaymentMethodWidget = ({paymentMode}) => (
    <Card title="Spending Trend by Payment Method of Month ">
        {paymentMode && paymentMode.map(item => (
            <p key={item.key}>{item.value} </p>
        ))}
    </Card>
)
PaymentMethodWidget.propTypes = {
    paymentMode: PropTypes.array.isRequired
}

export default PaymentMethodWidget;