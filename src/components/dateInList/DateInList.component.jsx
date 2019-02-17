import React from 'react';
import withStyles from 'react-jss';
import PropTypes from 'prop-types';
import styles from './dateInList.styles';

const DateInList = React.memo(({classes, date, month}) => (
    <div className={classes.dateContainer}>
        <div className={classes.date}>{date}</div>
        <div className={classes.month}>{month}</div>
    </div>
));

DateInList.propTypes = {
    classes: PropTypes.object,
    date: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired
}

export default withStyles(styles)(DateInList);