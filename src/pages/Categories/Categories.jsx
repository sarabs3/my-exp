import React  from 'react';
import {Col, Row, List, Avatar, Layout } from "antd";
import PageTitle from "../../components/PageTitle/PageTitle";
import {connect} from "react-redux";
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";

const Categories = ({ categories }) => {
    if (!categories) return null;
    return (
        <Layout.Content  style={{ padding: '0 50px' }}>
            <PageTitle>Categories</PageTitle>
            <Row>
                <Col>
                    <List
                        itemLayout="horizontal"
                        dataSource={categories}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar />}
                                    title={item.value.title}
                                    description={item.value.description}
                                />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </Layout.Content>
    );
};
const LoansEnhancer =  compose(
    firebaseConnect(props => (
        [
            {
                path: `Categories/${props.uid}`,
                storeAs: 'Categories'
            },
        ])
    ), connect(({ firebase }) => (
        {
            categories: firebase.ordered.Categories,
        }
    )))(Categories);
export default connect(({firebase}) => ({
    uid: firebase.auth.uid
}))(LoansEnhancer);
