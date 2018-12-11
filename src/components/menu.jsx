import React from 'react';
import { Menu } from 'antd';
import {Link} from 'react-router-dom'

class Navigation extends React.Component {
    render() {
        return (
            <Menu
                mode="horizontal"
                theme="dark"
                style={{lineHeight: '64px'}}
            >
                <Menu.Item><Link to='/dashboard'>Home</Link></Menu.Item>
                <Menu.Item><Link to='/dashboard/form'>Add</Link></Menu.Item>
                <Menu.Item><Link to='/dashboard/list'>List</Link></Menu.Item>
                <Menu.Item><Link to='/dashboard/stats'>Stats</Link></Menu.Item>
            </Menu>
        )
    }
}

export default Navigation;