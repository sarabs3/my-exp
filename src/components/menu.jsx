import React from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'

class Navigation extends React.Component {
    render() {
        return (
            <Menu
                mode="horizontal"
                theme="dark"
                style={{lineHeight: '64px'}}
            >
                <Menu.Item><Link to='/'>Home</Link></Menu.Item>
                <Menu.Item><Link to='/form'>Add</Link></Menu.Item>
                <Menu.Item><Link to='/page2'>List</Link></Menu.Item>
                <Menu.Item><Link to='/stats'>Stats</Link></Menu.Item>
            </Menu>
         )
    }
}

export default Navigation;