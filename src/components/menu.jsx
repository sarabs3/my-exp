import React from 'react';
import { Menu, Button } from 'antd';
import {Link} from 'react-router-dom'
import Media from "react-media";
class Navigation extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Media query="(max-width: 900px)">
                {matcher => matcher ? (
                    <Menu
                    mode="horizontal"
                    theme="dark"
                    style={{lineHeight: '64px'}}
                    >
                        <Menu.Item><Link to='/dashboard'>Home</Link></Menu.Item>
                        <Menu.Item><Button><Link to='/logout'>Logout</Link></Button></Menu.Item>
                    </Menu>
                ): (
                    <Menu
                        mode="horizontal"
                        theme="dark"
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item><Link to='/dashboard'>Home</Link></Menu.Item>
                        <Menu.Item><Link to='/dashboard/form'>Add</Link></Menu.Item>
                        <Menu.Item><Link to='/dashboard/list'>List</Link></Menu.Item>
                        <Menu.Item><Link to='/dashboard/stats'>Stats</Link></Menu.Item>
                        <Menu.Item><Link to="/dashboard/reports">Reports</Link></Menu.Item>
                        <Menu.Item><Button><Link to='/logout'>Logout</Link></Button></Menu.Item>
                    </Menu>
                    )}
                </Media>
            </React.Fragment>
        )
    }
}

export default Navigation;