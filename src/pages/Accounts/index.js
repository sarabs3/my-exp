import React from 'react';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect } from 'react-redux-firebase';
import { List, Layout, Row, Col } from 'antd';

const {Content} = Layout;

const Accounts = ({ accounts, firebase, uid }) => (
	<Content>
		<Row type="flex" justify='center'>
			<Col span={22}>
				<List
					dataSource={accounts}
					renderItem={account => (
						<List.Item>
								<List.Item.Meta
										title={account.value.name}
								/>
								<div>{account.value.balance}</div>
						</List.Item>
					)}
				/>
			</Col>
			</Row>
	</Content>
);

Accounts.defaultProps = {
    accounts: [],
};

const AccountEnhancer =  compose(
    firebaseConnect(
        props => (
            [
                {
                    path: `accounts/${props.uid}/`,
                    storeAs: 'accounts'
                }
            ]
        )
    ),
    connect(({ firebase }) => (
        {
            accounts: firebase.ordered.accounts,
        }
    ))
)(Accounts);

export default connect(({firebase}) => ({
    uid: firebase.auth.uid
}))(AccountEnhancer);

