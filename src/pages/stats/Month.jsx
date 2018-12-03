import React from 'react';
import 'react-table/react-table.css'
import moment from 'moment';
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firebaseConnect} from 'react-redux-firebase'
import Calendar from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./stats.css";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class Datalist extends React.Component {
    constructor(){
        super()
        this.state = {
            month:{
                name: moment().format('MMMM'),
                number: moment().month()
            },
            events: [
                {
                    start: new Date(),
                    end: new Date(moment().add(1, "days")),
                    title: "Some title"
                }
            ]
        }
    }
    createDate = data => {
        console.log('data', data)
        return data ? data.map(item => {
            return {
                start: moment().date(item.key).month(this.state.month.number).startOf('day'),
                end:  moment().date(item.key).month(this.state.month.number).endOf('day'),
                title: item.value
            }
        })
        : []
        
    }
    render() {
        const components = {
            event: MyEvent
        }
        return (
            <Calendar
            defaultDate={new Date()}
            defaultView="month"
            events={this.createDate(this.props.data)}
            style={{ height: "100vh" }}
            components={components}
            />
        )
    }
}
const MyEvent = (props) => (<p style={{background: props.title > 22 ? 'red' : 'green'}}>{props.title}</p>)

export default compose(
    firebaseConnect([{storeAs: 'stats',path: 'stats/year/2018/data/sep/data', queryParams: ['orderByChild=date']}]),
    connect(({firebase}) => ({data: firebase.ordered.stats}))
)(Datalist);