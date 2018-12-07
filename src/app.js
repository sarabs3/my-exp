import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import {BrowserRouter as Router} from 'react-router-dom'
import {Layout} from 'antd'
import Routes from './routes'
import Navigation from './components/menu';

const {Header} = Layout;

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