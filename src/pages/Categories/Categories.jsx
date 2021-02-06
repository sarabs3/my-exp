import React  from 'react';
import {Col, Row, List, Avatar, Button} from "antd";
import PageTitle from "../../components/PageTitle/PageTitle";
import {connect} from "react-redux";
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import {Link} from "react-router-dom";

const Categories = ({ categories }) => {
    if (!categories) return null;
    return (
        <div className="site-layout-content">
            <Row>
                <Col span={12}>

                    <PageTitle>Categories</PageTitle>
                </Col>
                <Col span={4}>
                    <Button type="primary"><Link to="/dashboard/categories/add">Add New</Link></Button>
                </Col>
            </Row>
            <Row>
                <Col span={16}>
                    <List
                        itemLayout="horizontal"
                        dataSource={categories}
                        renderItem={item => (
                            <List.Item
                                actions={[
                                    <Button type="link">Edit</Button>]}
                            >
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
        </div>
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
