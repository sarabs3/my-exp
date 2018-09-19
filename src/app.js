import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './routes'


class App extends React.Component {
    handleSubmit = (values) => {
        this.props.firebase.push('data/',values);
    }
    render() {
        return (
            <Router>
                <Routes handleSubmit={this.handleSubmit} />
            </Router>
        )
    }
}
export default compose(firebaseConnect(),connect())(App);