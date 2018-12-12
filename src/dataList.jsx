import ReactTable from "react-table";
import React from 'react';
import 'react-table/react-table.css'
import moment from 'moment';
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firebaseConnect} from 'react-redux-firebase'

const columns = [{
  Header: 'Title',
  accessor: 'value.title' // String-based value accessors!
}, {
  Header: 'Date',
  id:'Date',
  asc:true,
  accessor: d => moment(d.value.date).format('DD MMM YYYY'),
  Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
}, {
  id: 'amount', // Required because our accessor is not a string
  Header: 'Amount',
  accessor: d => d.value.amount // Custom value accessors!
}, {
  Header: 'Payment Mode',
  accessor: 'value.mode'
},
{
  Header: props => <span>Category</span>, // Custom header components!
  accessor: 'value.category'
},
{
  Header: 'Notes',
  accessor: 'value.notes' // String-based value accessors!
}]

const Datalist = (props) => (
  <ReactTable
    data={props.data}
    columns={columns}
    filterable
  />
);

export default compose(
  firebaseConnect([{path: 'data', queryParams: ['orderByChild=date']}]),
  connect(({firebase}) => ({data: firebase.ordered.data}))
  )(Datalist);