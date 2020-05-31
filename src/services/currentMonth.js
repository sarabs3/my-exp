import moment from 'moment';

export const currentMonth = data => data.length ? data.filter(item => {
    const start = moment().startOf('month');
    const end = moment().endOf('month');
    return moment(item.value.date).isBetween(start, end)
}) : [];
